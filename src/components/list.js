const id = location.href.split('=')[1];
let title;
let description;
let favoriteId;

const addFavorite = async() => {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('userData')).id;

  await axios
    .post(`https://hexschool-custom-project-threshold-server.vercel.app/600/users/${userId}/favorites`, {
      title: title,
      description: description,
      userId: userId,
      listId: id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log(res);
      favoriteId = res.data.id;
      Swal.fire({
        icon: 'success',
        title: '已加入收藏',
        text: res.data.title
      });
      deleteBtn();
    })
    .catch((err) => {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.response.statusText,
        text: err.response.data,
      });
      setTimeout(() => {
        localStorage.clear();
        location.reload();
      }, 1500);
    });
}

const deleteFavorite = async() => {
  const token = localStorage.getItem('token');

  await axios
    .delete(`https://hexschool-custom-project-threshold-server.vercel.app/600/favorites/${favoriteId}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      Swal.fire({
        icon: 'success',
        title: '已取消收藏'
      });
      addBtn();
    })
    .catch((err) => {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.response.statusText,
        text: err.response.data,
      });
      setTimeout(() => {
        localStorage.clear();
        location.reload();
      },1500)
    });
};

const addBtn = () => {
  str = `
      <p class="mb-1">未收藏</p>
      <a href="#" id="favoriteBtn" class="btn btn-light">加入收藏</a>
    `;

  document.querySelector('#favorite').innerHTML = str;

  const favoriteBtn = document.querySelector('#favoriteBtn');
  favoriteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addFavorite();
  });
};

const deleteBtn = () => {
  str = `
      <p class="mb-1">已收藏</p>
      <a href="#" id="favoriteBtn" class="btn btn-light">取消收藏</a>
    `;

  document.querySelector('#favorite').innerHTML = str;

  const favoriteBtn = document.querySelector('#favoriteBtn');
  favoriteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteFavorite();
  });
};

const renderFavoriteBtn = async (data) => {
  let favorite = false;
  let str = ''
  if (data.length == 0) {
    addBtn();
  } else {
    data.forEach((item) => {
      // console.log(item.listId, id)
      if(item.listId == id){
        favoriteId = item.id
        favorite = true;
      }
    });
    favorite ? deleteBtn() : addBtn()
  }
};

const getFavorite = async () => {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('userData')).id;

  await axios
    .get(`https://hexschool-custom-project-threshold-server.vercel.app/600/users/${userId}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log(res);
      renderFavoriteBtn(res.data);
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
      location.reload();
    });
};

const renderArticle = (data) => {
  title = data.title;
  description = data.description;
  let str = `
    <section>
      {
      <div class="ms-2">
        <p>"id": ${data.id},</p>
        <p>"title": ${data.title},</p>
        <p>"picture": ${data.picture},</p>
        <p>"description": ${data.description}</p>
      </div>
      }
    </section>
  `;
  document.querySelector('article').innerHTML = str;
};

const init = async () => {
  if (localStorage.getItem('userData')) {
    getFavorite();
  }

  await axios
    .get('https://hexschool-custom-project-threshold-server.vercel.app/lists')
    .then((res) => {
      // console.log(res);
      const content = res.data.filter((item) => item.id == id);
      renderArticle(content[0]);
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
      location.reload();
    });
};

init();
