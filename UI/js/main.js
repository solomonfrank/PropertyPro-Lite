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

})