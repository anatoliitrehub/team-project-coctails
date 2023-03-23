"use strict"
import { FetchCocktails } from './fetch';
import { renderPagination } from './pagination-show';
import { markupNotRequest } from './markup-bad-request';
import { localFavorites } from './localfavorites';



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
const galleryList = document.querySelector('.gallery__list');
const galleryTitle = document.querySelector('.gallery__title');
const favCoctNothing = document.querySelector('.favorite-cocktails__text');

const ingredientsTitle = document.querySelector('.ingredients__title');


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
    if (event.target.name.value === '') return;
   
    if (document.title === "Favorite cocktails") {
        
        
        searchFavoriteCockt(event);

    } else if (document.title === "Favorite ingredients") {
       
        searchFavoriteIng(event);
        

        
     }else{
       const mainGalleryTitle = document.querySelector('.gallerry__title-main-wrepper .gallery__title');
        fetchCocktails.fetchCocktailsByFirstName(event.target.name.value.trim()).then(res => {
            if (res.data.drinks === null) {
                mainGalleryTitle.textContent = `Sorry, we didn\'t find any cocktail for you`;
                galleryList.innerHTML = markupNotRequest();
                paginationEl.innerHTML = '';

            } else { 
                mainGalleryTitle.textContent = `Searching results`;
                 renderPagination(res.data);
            }
            event.target.name.value = '';
           window.scrollTo({
                top: 630
                })
            
            if(document.querySelector('.table__item--activ')!==null) {
            document.querySelector('.table__item--activ').classList.remove('table__item--activ')}
    })
    }
}
function onSearchMobileMenu(event) { 
    event.preventDefault();
    
    // fetchCocktails.fetchCocktailsByFirstName(event.target.name.value.trim()).then(res => {
           
    //         renderPagination(res.data);
    //         event.target.name.value = '';
    // })
    if (event.target.name.value === '') return;
   
    if (document.title === "Favorite cocktails") {
        
        
        searchFavoriteCockt(event);

    } else if (document.title === "Favorite ingredients") {
       
        searchFavoriteIng(event);
        

        
     }else{
       const mainGalleryTitle = document.querySelector('.gallerry__title-main-wrepper .gallery__title');
        fetchCocktails.fetchCocktailsByFirstName(event.target.name.value.trim()).then(res => {
            if (res.data.drinks === null) {
                mainGalleryTitle.textContent = `Sorry, we didn\'t find any cocktail for you`;
                galleryList.innerHTML = markupNotRequest();
                paginationEl.innerHTML = '';

            } else {
                mainGalleryTitle.textContent = `Searching results`;
                renderPagination(res.data);
            }
        })
    window.scrollTo({
        top: 780
    })}
    onToggle();
}

////favcockt
function searchFavoriteCockt(event) { 

    
    const data = localFavorites.getLocal("favcockt")

    
    const resultSearch = {
        drinks: data.filter(el => {
            return el.strDrink.toLowerCase().includes(event.target.name.value.toLowerCase())
        })
        
    }
   
    if (resultSearch.drinks.length === 0) {
        galleryTitle.textContent='Sorry, we didn\'t find any cocktail for you';
        galleryList.innerHTML = markupNotRequest();
        

    favCoctNothing.textContent = '';
    } else {
        galleryTitle.textContent='Favorite cocktails';
        renderPagination(resultSearch);
    }
   
    
    event.target.name.value = '';
}


function searchFavoriteIng(event) { 
    const data = localFavorites.getLocal("favingr");
    const resultSearch = data.filter(el => {    
            return el.strIngredient.toLowerCase().includes(event.target.name.value.toLowerCase())
    })
    const ingredientsItem = document.querySelectorAll('.ingredients__item');
    ingredientsItem.forEach(el =>
        el.style.display = 'flex'
    );
    if (resultSearch.length === 0) {
        ingredientsTitle.textContent = 'Sorry, we didn\'t find any ingredients for you';
        // ingredientsList.innerHTML = markupNotRequest();
         ingredientsItem.forEach(el =>
        el.style.display = 'none'
    );
    } else {
    
        ingredientsItem.forEach(el => {
            
            if (!el.firstElementChild.textContent.toLowerCase().includes(event.target.name.value.toLowerCase())){
                
                el.style.display = 'none';
            }
        })
        ingredientsTitle.textContent = 'Favorite ingredients';
    }
  
    event.target.name.value = '';
}

// listeners
mobileMenuOpen.addEventListener('click', onToggle)
mobileMenuClose.addEventListener('click', onToggle)
dropdownBtn.addEventListener('click', onDropdown)
themeBtnHeader.addEventListener('click', onTheme)
mobileMenuThemeBtn.addEventListener('click', onTheme)
headerSearch.addEventListener('submit', onSearch)
headerMobileMenuSearch.addEventListener('submit', onSearchMobileMenu)