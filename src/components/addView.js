if (!localStorage.getItem('token') || !JSON.parse(localStorage.getItem('userData')).admin) {
  window.location = 'index.html';
  return;
}

// 表單驗證選項
const constraints = {
  標題: {
    presence: {
      message: '是必填欄位',
    },
  },
  圖片: {
    presence: {
      message: '是必填欄位',
    },
  },
  詳細資訊: {
    presence: {
      message: '是必填欄位',
    },
  },
};

const addViewForm = document.querySelector('#addViewForm');
const formInput = document.querySelectorAll('[data-input]');

const title = document.querySelector('#title');
const picture = document.querySelector('#picture');
const description = document.querySelector('#description');

const dataMsgs = document.querySelectorAll('[data-msg]');

const addList = async() => {
  await axios
    .post('http://localhost:3000/lists', {
      title: title.value,
      picture: picture.value,
      description: description.value
    })
    .then((res) => {
      // console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: res.data.title,
      });
    })
    .catch((err) => {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.response.statusText,
        text: err.response.data,
      });
    });
}

// 送出訂單前驗證
addViewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let validError = false;

  const errors = validate(addViewForm, constraints);
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
  addList();
})

// 訂單內表單輸入驗證
formInput.forEach((inputHtml) => {
  inputHtml.addEventListener('input', (e) => {
    // console.log(e.target.value);
    const name = e.target.name;
    const errorMsg = document.querySelector(`[data-msg=${name}]`);
    errorMsg.textContent = '';
    const errors = validate(addViewForm, constraints);

    if (errors) {
      if (errors[name]) {
        // console.log(errors[name])
        errorMsg.textContent = errors[name][0];
      }
    }
  });
});