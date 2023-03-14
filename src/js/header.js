"use strict"
// import _header from "./sass/components/_header"

const mobileMenuOpen = document.querySelector('.header__burger-menu');
// const mobileMenuClose=
const mobileMenu=document.querySelector('.header__burger-wrapper')

mobileMenuOpen.addEventListener('click', onToggle)

function onToggle() { 
    console.log('click');
    mobileMenu.classList.toggle('header__mobile-menu-is-open');
}