const deleteFavorite = async(id) => {
  const token = localStorage.getItem('token');
  console.log(id)

  await axios
    .delete(`https://hexschool-custom-project-threshold-server.vercel.app/600/favorites/${id}`,{
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
      setTimeout(() => {
        location.reload();
      },1500)
    })
    .catch((err) => {
      // console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.response.statusText,
        text: err.response.data,
      });
      setTimeout(() => {
        location.reload();
      },1500)
    });
}

const renderList = (listData) => {
  let str = '';
  listData.forEach((item) => {
    str += `
      <li class="col">
        <div class="card h-100">
          <div class="card-body mb-4">
            <div class="d-flex">
              <a href="#" id="deleteBtn" class="btn btn-secondary d-flex align-items-center ms-auto" data-id="${item.id}">已收藏
                <i class="ms-2 fa-regular fa-bookmark"></i>
              </a>
            </div>
            <h5 class="card-title fw-bold">${item.list.title}</h5>
            <p class="card-text text-truncate">${item.list.description}</p>
          </div>
        </div>
      </li>
    `;
  });
  document.querySelector('#viewList').innerHTML = str;
  const deleteBtn = document.querySelectorAll('#deleteBtn');
  for(let i=0; i<deleteBtn.length; i++){
    deleteBtn[i].addEventListener('click', (e) => {
      e.preventDefault();
      deleteFavorite(e.target.dataset.id);
    })
  }
}

const init = async () => {
  if (!localStorage.getItem('token')) {
    window.location = 'index.html';
    return;
  }

  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('userData')).id;

  await axios
    .get(`https://hexschool-custom-project-threshold-server.vercel.app/600/users/${userId}/favorites?_expand=list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      if(res.data.length > 0){
        renderList(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
      location.reload();
    });
};

init();
