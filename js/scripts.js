const menuToggle = document.querySelector('.menu__toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu__toggle--active');
    nav.classList.toggle('nav--open');
})