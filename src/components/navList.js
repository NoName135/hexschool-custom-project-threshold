const navList = (type) => {
  let str;
  if(type == "guest"){
    str = `
      <li class="nav-item mx-auto mb-2 mb-lg-0 me-lg-4">
        <a class="text-decoration-none link-secondary" href="./#login.html">登入</a>
      </li>
      <li class="nav-item mx-auto mb-2 mb-lg-0">
        <a class="btn btn-primary" href="./#signUp.html">免費註冊</a>
      </li>
    `;
  }else if(type == "user"){
    const name = JSON.parse(localStorage.getItem('userData')).nickname;
    str = `
      <li class="nav-item mx-auto mb-2 mb-lg-0 me-lg-3">
        <p class="mb-0">Hello！${name}</p>
      </li>
      <li class="nav-item mx-auto mb-2 mb-lg-0 me-lg-4">
        <a class="text-decoration-none link-secondary" href="./#favoriteList.html">收藏列表</a>
      </li>
      <li class="nav-item mx-auto mb-2 mb-lg-0">
        <a id="logout" class="text-decoration-none link-secondary" href="#">登出</a>
      </li>
    `;
  }else if(type == "admin"){
    const name = JSON.parse(localStorage.getItem('userData')).nickname;
    str = `
      <li class="nav-item mx-auto mb-2 mb-lg-0 me-lg-3">
        <p class="mb-0">Hello！${name}</p>
      </li>
      <li class="nav-item mx-auto mb-2 mb-lg-0 me-lg-4">
        <a class="text-decoration-none link-secondary" href="./#backstage.html">前往後台</a>
      </li>
      <li class="nav-item mx-auto mb-2 mb-lg-0 me-lg-4">
        <a class="text-decoration-none link-secondary" href="./#favoriteList.html">收藏列表</a>
      </li>
      <li class="nav-item mx-auto mb-2 mb-lg-0">
        <a id="logout" class="text-decoration-none link-secondary" href="#">登出</a>
      </li>
    `;
  }
  document.querySelector('#navList').innerHTML = str;

  if(type == 'user' || type == 'admin'){
    const logout = document.querySelector('#logout')
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      location.reload();
    })
  }
};

export default navList;