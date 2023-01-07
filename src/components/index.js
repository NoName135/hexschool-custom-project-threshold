const renderList = (listData) => {
  let str = '';
  listData.forEach(item => {
    str += `
      <li class="col">
        <div class="card h-100">
          <div class="card-body mb-4">
            <div class="d-flex">
              <a href="../../list.html?article=${item.id}" class="link-primary d-flex ms-auto">延伸閱讀</a>
            </div>
            <h5 class="card-title fw-bold">${item.title}</h5>
            <p class="card-text text-truncate">${item.description}</p>
          </div>
        </div>
      </li>
    `;
  })
  document.querySelector('#viewList').innerHTML = str;
}

const init = async() => {
  await axios.get('http://localhost:3000/lists')
    .then(res => {
      // console.log(res);
      renderList(res.data)
    })
    .catch(err => {
      console.log(err);
      localStorage.clear();
      location.reload();
    })
};

init();
