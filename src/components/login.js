// 表單驗證選項
const constraints = {
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
};

const loginForm = document.querySelector('#loginForm');
const formInput = document.querySelectorAll('#loginForm input');

const email = document.querySelector('#email');
const password = document.querySelector('#password');

const dataMsgs = document.querySelectorAll('[data-msg]');

const login = async() => {
  await axios.post('https://hexschool-custom-project-threshold-server.vercel.app/login', {
    "email": email.value,
    "password": password.value
  })
    .then(res => {
      // console.log(res);
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('userData', JSON.stringify(res.data.user));
      Swal.fire({
        icon: 'success',
        title: '登入成功',
        text: res.data.user.email
      });
      setTimeout(() => {
        window.location = 'index.html';
      }, 1500);
    })
    .catch(err => {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.response.statusText,
        text: err.response.data,
      });
    })
}

// 送出訂單前驗證
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let validError = false;

  const errors = validate(loginForm, constraints);
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
  login();
})

// 訂單內表單輸入驗證
formInput.forEach((inputHtml) => {
  inputHtml.addEventListener('input', (e) => {
    // console.log(e.target.value);
    const name = e.target.name;
    const errorMsg = document.querySelector(`[data-msg=${name}]`);
    errorMsg.textContent = '';
    const errors = validate(loginForm, constraints);

    if (errors) {
      if (errors[name]) {
        // console.log(errors[name])
        errorMsg.textContent = errors[name][0];
      }
    }
  });
});