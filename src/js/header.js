"use strict"


const mobileMenuOpen = document.querySelector('.header__burger-menu');
const mobileMenuClose=document.querySelector('.header__mobile-menu-close')
const mobileMenu=document.querySelector('.header__mobile-menu')
const dropdownMenu = document.querySelector('.header__mobile-menu-dropdown-content')
const dropdownBtn=document.querySelector('.mobile-menu-dropdown__btn')




function onToggle() { 
    
    mobileMenu.classList.toggle('header__mobile-menu-is-open');
}

function onDropdown(event) {
    // console.dir(event.target.children[0].href.animVal)
    dropdownMenu.classList.toggle('mobile-menu-dropdown-content-is-open')
}
// open dropdown

// listeners
mobileMenuOpen.addEventListener('click', onToggle)
mobileMenuClose.addEventListener('click', onToggle)
dropdownBtn.addEventListener('click', onDropdown)