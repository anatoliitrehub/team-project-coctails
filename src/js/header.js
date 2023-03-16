"use strict"
import { FetchCocktails } from './fetch';
import { renderPagination } from './pagination-show';
import { markupNotRequest } from './markup-bad-request';

const paginationEl = document.querySelector('.pagination');
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
const headerMobileMenuSearch = document.querySelector('.header__mobile-menu-form--search');
const galleryListEl = document.querySelector('.gallery__list');


const fetchCocktails = new FetchCocktails();

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
    // console.dir(event.srcElement.ownerDocument.title);
    if(event.srcElement.ownerDocument.title==="Favorite cocktails"){
        console.log('done Favorite cocktails ')

    } else if (event.srcElement.ownerDocument.title === "Favorite ingredients") {
        console.log('done Favorite ingredients ')
        
     }else{
        // console.log('done cocktails ')
        // console.log(event.target.name.value.trim())
       
        fetchCocktails.fetchCocktailsByFirstName(event.target.name.value.trim()).then(res => {
           if (!res.data.drinks) {
            galleryListEl.innerHTML = markupNotRequest();
               paginationEl.replaceChildren();
               event.target.name.value = '';
            return;
            }
            renderPagination(res.data);
            event.target.name.value = '';
            window.scrollTo({
            top: 630
         })
    })
        
   
    }
   
}
function onSearchMobileMenu(event) { 
    event.preventDefault();
    fetchCocktails.fetchCocktailsByFirstName(event.target.name.value.trim()).then(res => {
            console.log(res)
            if (!res.data.drinks) {
            galleryListEl.innerHTML = markupNotRequest();
            paginationEl.replaceChildren();
            event.target.name.value = '';
            return;
            }
        
            renderPagination(res.data);
            event.target.name.value = '';
    })
    window.scrollTo({
        top: 780
    })
    onToggle();
}



// listeners
mobileMenuOpen.addEventListener('click', onToggle)
mobileMenuClose.addEventListener('click', onToggle)
dropdownBtn.addEventListener('click', onDropdown)
themeBtnHeader.addEventListener('click', onTheme)
mobileMenuThemeBtn.addEventListener('click', onTheme)
headerSearch.addEventListener('submit', onSearch)
headerMobileMenuSearch.addEventListener('submit', onSearchMobileMenu)