"use strict"


const mobileMenuOpen = document.querySelector('.header__burger-menu');
const mobileMenuClose=document.querySelector('.header__mobile-menu-close')
const mobileMenu=document.querySelector('.header__mobile-menu')
const dropdownMenu = document.querySelector('.header__mobile-menu-dropdown-content')
const dropdownBtn = document.querySelector('.mobile-menu-dropdown__btn')
const htmlEL = document.documentElement;
const themeBtnHeader = document.querySelector('.header__switch [type="checkbox"]')
const currentThemeLightHeader = document.querySelector('.theme__list-light');
const currentThemeDarkHeader = document.querySelector('.theme__list-dark');




function onToggle() { 
    
    mobileMenu.classList.toggle('header__mobile-menu-is-open');
}

function onDropdown(event) {
    
    dropdownMenu.classList.toggle('mobile-menu-dropdown-content-is-open')
}

function onTheme(event) { 
    console.log(event.target.checked)
    if (event.target.checked) {
        htmlEL.classList.remove('light')
        htmlEL.classList.add('dark')
        currentThemeLightHeader.classList.remove('header__current');
        currentThemeDarkHeader.classList.add('header__current');

    } else { 
         htmlEL.classList.remove('dark')
        htmlEL.classList.add('light')
        currentThemeDarkHeader.classList.remove('header__current');
         currentThemeLightHeader.classList.add('header__current');
        
    }
}

// listeners
mobileMenuOpen.addEventListener('click', onToggle)
mobileMenuClose.addEventListener('click', onToggle)
dropdownBtn.addEventListener('click', onDropdown)
themeBtnHeader.addEventListener('click',onTheme)