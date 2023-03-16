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
const mobileMenuThemeBtn = document.querySelector('.header__switch-mobile-menu [type="checkbox"]');
const currentThemeLightMobileMenu = document.querySelector('.theme__list--mobile-menu-ligth');
const currentThemeDarkMobileMenu = document.querySelector('.theme__list--mobile-menu-dark');
const headerSearch = document.querySelector('.header__form--search');


if (localStorage.getItem('theme')) {
    onThemeSet(localStorage.getItem('theme'))
} 



function onToggle() { 
    
    mobileMenu.classList.toggle('header__mobile-menu-is-open');
}

function onDropdown(event) {
    
    dropdownMenu.classList.toggle('mobile-menu-dropdown-content-is-open')
}

function setTheme(themeName) { 
    localStorage.setItem('theme', themeName);
}

function onThemeSet(themeName) { 
    
    if (themeName==='dark') {
        htmlEL.classList.remove('light')
        htmlEL.classList.add('dark')
        currentThemeLightHeader.classList.remove('header__current');
        currentThemeDarkHeader.classList.add('header__current');
        currentThemeLightMobileMenu.classList.remove('header__current');
        currentThemeDarkMobileMenu.classList.add('header__current');
        setTheme('dark');
        themeBtnHeader.checked = true;
        mobileMenuThemeBtn.checked = true;
        
    } else { 
         htmlEL.classList.remove('dark')
        htmlEL.classList.add('light')
        currentThemeDarkHeader.classList.remove('header__current');
        currentThemeLightHeader.classList.add('header__current');
        currentThemeDarkMobileMenu.classList.remove('header__current');
        currentThemeLightMobileMenu.classList.add('header__current');
        setTheme('light');
        themeBtnHeader.checked = false;
        mobileMenuThemeBtn.checked = false;
        
    }
}

function onTheme(event) { 
    if (event.target.checked) { 
        onThemeSet('dark')
    } else {
        onThemeSet('light')
    }
}
function onSearch(event) { 
    event.preventDefault();
    console.dir(event.srcElement.ownerDocument.title);
}

// listeners
mobileMenuOpen.addEventListener('click', onToggle)
mobileMenuClose.addEventListener('click', onToggle)
dropdownBtn.addEventListener('click', onDropdown)
themeBtnHeader.addEventListener('click', onTheme)
mobileMenuThemeBtn.addEventListener('click', onTheme)
headerSearch.addEventListener('submit',onSearch)