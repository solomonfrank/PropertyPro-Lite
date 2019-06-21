document.querySelector('.icon').addEventListener('click', () => {
    let navCont = document.querySelector('.nav-container');
    let toggleAside = document.querySelector('.toggle-class');
    let imgWrapper = document.querySelector('.img-wrapper');
    if (navCont) {
        navCont.classList.toggle('open');
    }

    if (toggleAside) {
        toggleAside.classList.toggle('open');
        imgWrapper.classList.toggle('img-open');
    }

});
let modalBtn = document.getElementById("btn-del")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
let close = document.querySelector(".close")
let okBtn = document.querySelector(".ok-btn")

okBtn.onclick = function () {
    modal.style.display = "none";
    modalBtn.style.backgroundColor = 'gray';

}

modalBtn.onclick = function () {
    modal.style.display = "block"
}
close.onclick = function () {
    modal.style.display = "none"
}
closeBtn.onclick = function () {
    modal.style.display = "none"
}
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none"
    }
}