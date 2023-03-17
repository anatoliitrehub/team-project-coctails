import { galleryMarkUp } from './markup';
import { pagination } from './pagination';
import { addOnLearnMoreClick } from './markup';
import { markupNotRequest } from './markup-bad-request';

const paginationEl = document.querySelector('.pagination');
const galleryEl = document.querySelector('.gallery__list');
const galleryTitle = document.querySelector('.gallerry__title-main-wrepper');

let copyArr = [];
let activePage = 1;
let itemsPerPage;
let totalBtn;

function renderPagination({ drinks }) {
  let filteredArray;

  try {
    filteredArray = drinks.filter(item => item !== null);
    galleryTitle.innerHTML = `<h2 class="gallery__title">Searching results</h2>`;
  } catch {
    console.log(drinks);
    galleryTitle.innerHTML = `<h2 class="gallery__title">Sorry, we didn't find any cocktail for you</h2>`;
    galleryEl.innerHTML = markupNotRequest();
    paginationEl.replaceChildren();
    return;
  }

  showPage(filteredArray);
  copyArr = [...drinks];
}

function screenWidthFull() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    itemsPerPage = 3;
    totalBtn = 5;
  } else if (screenWidth < 1280) {
    itemsPerPage = 6;
    totalBtn = 7;
  } else {
    itemsPerPage = 9;
    totalBtn = 7;
  }
}

function showPage(items, currentPage = 1) {
  screenWidthFull();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = items.slice(startIndex, endIndex);

  activePage = currentPage;

  galleryEl.replaceChildren();
  galleryEl.insertAdjacentHTML('beforeend', galleryMarkUp(pageItems));
  // addOnLearnMoreClick(pageItems)

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

if (paginationEl) {
  paginationEl.addEventListener('click', nextPageActive);
  paginationEl.addEventListener('click', prevPageActive);
  paginationEl.addEventListener('click', clickHandler);
}

window.addEventListener('resize', screenWidthFull);

export { renderPagination };
