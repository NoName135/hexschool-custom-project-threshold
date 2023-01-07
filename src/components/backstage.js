const deleteList = async (id) => {
  console.log(id);

  await axios
    .delete(`https://hexschool-custom-project-threshold-server.vercel.app/lists/${id}`)
    .then((res) => {
      // console.log(res);
      Swal.fire({
        icon: 'success',
        title: '已刪除景點',
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
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
      }, 1500);
    });
};

const renderTable = (data) => {
  let str = '';
  data.forEach((item, i) => {
    str += `
      <tr>
        <th scope="row"><div class="d-flex flex-row-column align-items-center"><span class="text-danger me-2">${
          i + 1
        }</span><span>${item.title}</span></div></th>
        <td class="d-flex align-items-center">
          <span class="me-2">${item.description}</span>
          <div class="ms-auto d-flex">
            <div id="deleteBtn" data-id=${
              item.id
            } class="btn btn-outline-danger text-nowrap">刪除</div>
            <a href="./#editView.html?id=${
              item.id
            }" id="editBtn" class="btn btn-warning text-nowrap">編輯</a>
          </div>
        </td>
      </tr>
    `;
  });
  document.querySelector('tbody').innerHTML = str;
  const deleteBtn = document.querySelectorAll('#deleteBtn');
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', (e) => {
      e.preventDefault();
      deleteList(e.target.dataset.id);
    });
  }
};

const init = async () => {
  if (!localStorage.getItem('token') || !JSON.parse(localStorage.getItem('userData')).admin) {
    window.location = 'index.html';
    return;
  }

  await axios
    .get('https://hexschool-custom-project-threshold-server.vercel.app/lists')
    .then((res) => {
      // console.log(res.data);
      renderTable(res.data);
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
      window.location = 'login.html';
    });
};

init();
