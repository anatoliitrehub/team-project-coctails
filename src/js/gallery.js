const BASE_URL = 'www.thecocktaildb.com/api/json/v1/1/';
const params = 'random.php';


const fetchCountries = () => {
    return fetch(`${BASE_URL}${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then(data => console.log(data))
};

// fetchCountries()
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// class Markup {

//     handleCreatMarkup(dates) {
//         const countryInfoMarkup = dates.map(({ strDrinkThumb, strDrink}) => {
//         return `
// <li class="gallery__item">
//       <div class="gallery__box">
//         <img
//           class="container gallery__picture"
//           src${strDrinkThumb}
//           alt="coctail foto"
//         />
//         <div class="gallery__figcaption">
//           <h3 class="gallery__figcaption--coctail">${strDrink}</h3>
//           <div class="gallery__figcaption--buttons">
//             <button class="gallery__figcaption--info js-learn-more">
//               Learn more
//             </button>
//             <button
//               class="gallery__figcaption--storage"
//               data-add="localStorage"
//             >
//               Add to
//               <svg class="gallery__figcaption--icon">
//                 <use href="./images/icons.svg#icon-heart"></use>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </li>`
//     }).join('')
//     return countryInfoMarkup;
//     }
// };

// Markup.handleCreatMarkup(fetchCountries)