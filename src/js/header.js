"use strict"


const mobileMenuOpen = document.querySelector('.header__burger-menu');
const mobileMenuClose=document.querySelector('.header__mobile-menu-close')
const mobileMenu=document.querySelector('.header__mobile-menu')
const dropdownMenu = document.querySelector('.header__mobile-menu-dropdown-content')
const dropdownBtn = document.querySelector('.mobile-menu-dropdown__btn')
const htmlEL = document.documentElement;
const themeBtn=document.querySelector('.header__switch [type="checkbox"]')
console.log(themeBtn)



function onToggle() { 
    
    mobileMenu.classList.toggle('header__mobile-menu-is-open');
}

function onDropdown(event) {
    // console.dir(event.target.children[0].href.animVal)
    dropdownMenu.classList.toggle('mobile-menu-dropdown-content-is-open')
}
function onTheme(event) { 
    console.log(event.target.checked)
    if (event.target.checked) {
        htmlEL.classList.remove('lig')
        htmlEL.classList.add('dark')
    } else { 
         htmlEL.classList.remove('dark')
        htmlEL.classList.add('light')
    }
}

// listeners
mobileMenuOpen.addEventListener('click', onToggle)
mobileMenuClose.addEventListener('click', onToggle)
dropdownBtn.addEventListener('click', onDropdown)
themeBtn.addEventListener('click',onTheme)