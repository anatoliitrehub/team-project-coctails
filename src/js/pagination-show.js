import { galleryMarkUp } from './markup';
import { pagination } from './pagination';

const paginationEl = document.querySelector('.pagination');
const galleryEl = document.querySelector('.gallery__list');


let itemsPerPage = 9;
let totalBtn = 7;
let copyArr = [];
let activePage = 1;
let screenWidth = window.innerWidth;

loadScreenSizeFromLocalStorage();

function renderPagination({drinks}) {
  showPage(drinks);
  copyArr = [...drinks];
}

function showPage(items, currentPage = 1) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = items.slice(startIndex, endIndex);

  activePage = currentPage;

  galleryEl.replaceChildren();
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkUp(pageItems));

  paginationEl.replaceChildren();
  
  const totalPage = Math.ceil(items.length / itemsPerPage);
  if (totalPage > 1) {
    createPrevBtn(currentPage);
    createPagination(currentPage, totalPage, totalBtn);
    createNextBtn(totalPage, currentPage);
  }
}

function createPrevBtn(currentPage) {
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('pagination__btn--prev');
  prevBtn.textContent = '<';
  paginationEl.appendChild(prevBtn);
  if (currentPage < 2) {
    prevBtn.disabled = true;
  }
}

function createPagination(currentPage, totalPage, totalBtn) {
  const pages = pagination(currentPage, totalPage, totalBtn);

  const renderNumber = pages.forEach((page, i) => {
    const button = document.createElement('button');
    button.classList.add('pagination__btn');
    button.textContent = page;
    if (pages[i] === currentPage) {
      button.classList.add('pagination__btn--active');
      button.disabled = true;
    }
    if (pages[i] === '...') {
      button.disabled = true;
    }
    paginationEl.appendChild(button);
  });

  return renderNumber;
}

function createNextBtn(totalPage, currentPage) {
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('pagination__btn--next');
  nextBtn.textContent = '>';
  paginationEl.appendChild(nextBtn);
  if (totalPage === currentPage) {
    nextBtn.disabled = true;
  }
}

function clickHandler(event) {
  if (!event.target.classList.contains('pagination__btn')) return;

  const numberPage = +event.target.textContent;
  showPage(copyArr, numberPage);
}

function screenWidthFull() {
  screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    itemsPerPage = 3;
    totalBtn = 5;
  } else if (screenWidth < 1280) {
    itemsPerPage = 6;
  } else {
    itemsPerPage = 9;
  }
  localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
}

function loadScreenSizeFromLocalStorage() {
  const savedItemsPerPage = JSON.parse(localStorage.getItem('itemsPerPage'));
  if (savedItemsPerPage !== null) {
    itemsPerPage = parseInt(savedItemsPerPage);
  }
}

function nextPageActive(event) {
  if (!event.target.classList.contains('pagination__btn--next')) return;
  activePage++;
  showPage(copyArr, activePage);
}

function prevPageActive(event) {
  if (!event.target.classList.contains('pagination__btn--prev')) return;
  activePage--;
  showPage(copyArr, activePage);
}

paginationEl.addEventListener('click', nextPageActive);
paginationEl.addEventListener('click', prevPageActive);
paginationEl.addEventListener('click', clickHandler);
window.addEventListener('resize', screenWidthFull);

screenWidthFull();

export {renderPagination}
