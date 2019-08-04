

document.addEventListener('DOMContentLoaded', () => {
  const params = {
    url: 'http://localhost:5000/property',

    method: 'get',

  };

  fetchData(params).catch(err => (console.log(err.stack)));
});
document.querySelector('.icon').addEventListener('click', () => {
  const navCont = document.querySelector('.nav-container');
  const toggleAside = document.querySelector('.toggle-class');
  const imgWrapper = document.querySelector('.img-wrapper');
  if (navCont) {
    navCont.classList.toggle('open');
  }

  if (toggleAside) {
    toggleAside.classList.toggle('open');
    imgWrapper.classList.toggle('img-open');
  }
});
const modalBtn = document.getElementById('btn-del') || document.getElementById('sold');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const close = document.querySelector('.close');
const okBtn = document.querySelector('.ok-btn');

okBtn.onclick = function () {
  modal.style.display = 'none';
  modalBtn.style.backgroundColor = 'gray';
};

modalBtn.onclick = function () {
  modal.style.display = 'block';
};
close.onclick = function () {
  modal.style.display = 'none';
};
closeBtn.onclick = function () {
  modal.style.display = 'none';
};
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};

async function fetchData({ url, method }) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
    },


  });

  const result = await response.json();
  const resultJson = result.data;

  if (!response.ok) {
    console.log(response.statusText);
  }

  resultJson.forEach(item => {

    console.log(item);

    let wrapDiv = document.createElement('div');
    wrapDiv.className = 'wrap-box';
    wrapDiv.innerHTML = `
    
    <div class="prop-box">

    <div class="prop-img-wrapper">
    <img src="${item.image_url}">
       

    </div>

    <div class="prop-desc">
        <div class="desc">
            <p> ${item.type}
            </p>
        </div>
        <div class="link-wrap"> <a href="./UI/user/prop.html">View Property</a></div>
    </div>
</div>
    
    `;
    document.querySelector('.prop-container').append(wrapDiv);
  });
}
