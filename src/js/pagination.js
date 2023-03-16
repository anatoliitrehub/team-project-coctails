export function pagination(currentPage, totalPage, totalButton) {
    const halfPagesShown = Math.floor(totalButton / 2);
  
    const breakingEnd = totalPage - halfPagesShown;
    const breakingStart = 1 + halfPagesShown;
  
    let pages = [];
    let endArr = [];
    let startArr = [];
    let deltaArr = [];
  
    for (let i = breakingEnd; i <= totalPage; i++) {
      endArr.push(i);
    }
  
    for (let i = 1; i <= breakingStart; i++) {
      startArr.push(i);
    }
  
    for (let i = totalPage - totalButton + 1; i < endArr[0]; i++) {
      deltaArr.push(i);
    }
  
    if (totalPage <= totalButton) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < breakingStart) {
        pages = [...startArr, '...', totalPage];
      } else if (currentPage >= breakingStart) {
        for (let i = currentPage; i <= currentPage + halfPagesShown; i++) {
          pages.push(i - 1);
        }
        pages.push('...');
        pages.push(totalPage);
      }
  
      if (currentPage >= breakingEnd) {
        pages = [1, '...', ...endArr];
      }
  
      if (currentPage === breakingEnd - 1 || currentPage === breakingEnd) {
        pages = [...deltaArr, ...endArr];
      }
    }
  
    return pages;
  }