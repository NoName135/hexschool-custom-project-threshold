// 表單驗證選項
const constraints = {
  暱稱: {
    presence: {
      message: '是必填欄位',
    },
    length: {
      maximum: 6,
      message: '暱稱最多 6 個字',
    },
  },
  信箱: {
    presence: {
      message: '是必填欄位',
    },
    email: {
      message: '格式有誤',
    },
  },
  密碼: {
    presence: {
      message: '是必填欄位',
    },
    length: {
      minimum: 8,
      message: '密碼需超過 8 碼',
    },
  },
  確認密碼: {
    presence: {
      message: '是必填欄位',
    },
    equality: {
      attribute: '密碼',
      message: '密碼不一致',
    },
  },
};

const signUpForm = document.querySelector('#signUpForm');
const formInput = document.querySelectorAll('#signUpForm input');

const nickname = document.querySelector('#nickname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#passwordCheck');

const dataMsgs = document.querySelectorAll('[data-msg]');

const signUp = async () => {
  await axios
    .post('https://hexschool-custom-project-threshold-server.vercel.app/users', {
      email: email.value,
      password: password.value,
      nickname: nickname.value,
    })
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '註冊成功',
        text: '將跳轉至登入頁面',
      });
      setTimeout(() => {
        window.location = 'login.html';
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.response.statusText,
        text: err.response.data,
      });
    });
};

// 送出訂單前驗證
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let validError = false;

  const errors = validate(signUpForm, constraints);
  dataMsgs.forEach(textHtml => {
    textHtml.textContent = ''
  })

  if(errors){
    validError = true
    Object.entries(errors).forEach(error => {
      // console.log(error)
      dataMsgs.forEach(textHtml => {
        // console.log(textHtml.dataset.msg)
        if(error[0] === textHtml.dataset.msg){
          document.querySelector(`[data-msg="${error[0]}"]`).textContent = error[1];
        }
      })
    })
  }

  if(validError){
    return
  }
  signUp();
})

// 訂單內表單輸入驗證
formInput.forEach((inputHtml) => {
  inputHtml.addEventListener('input', (e) => {
    // console.log(e.target.value);
    const name = e.target.name;
    const errorMsg = document.querySelector(`[data-msg=${name}]`);
    errorMsg.textContent = '';
    const errors = validate(signUpForm, constraints);

    if (errors) {
      if (errors[name]) {
        // console.log(errors[name])
        errorMsg.textContent = errors[name][0];
      }
    }
  });
});