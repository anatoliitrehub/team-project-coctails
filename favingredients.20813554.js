function e(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},i=n.parcelRequire3bf6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},n.parcelRequire3bf6=i),i.register("kyEFX",(function(n,t){var r,i;e(n.exports,"register",(function(){return r}),(function(e){return r=e})),e(n.exports,"resolve",(function(){return i}),(function(e){return i=e}));var o={};r=function(e){for(var n=Object.keys(e),t=0;t<n.length;t++)o[n[t]]=e[n[t]]},i=function(e){var n=o[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),i("kyEFX").register(JSON.parse('{"bEh95":"favingredients.20813554.js","8OQ7p":"icons.9a626274.svg","4n2Z5":"favingredients.092b2fc0.js","1fB4g":"favingredients.0efdf02f.js"}'));var o=i("6JFXQ");i("bUb57");var s,a=i("kpUQZ");function d(e){return e.map((({strIngredient:e,strType:n},t)=>`<li class="ingredients__item">\n            <h3 class="ingredients__name">${e}</h3>\n            <p class="ingredients__type">${n}</p>\n            <div class="ingredients__buttons" data-index="${t}">\n                <button type="button" class="ingredients__learn-more" >\n                    Learn more\n                </button>\n                <button type="button" class="ingredients__favorite">\n                    <span class="ingredients__favorite-text">Remove</span>\n                    <svg class="ingredients__favorite-icon" width="18" height="18">\n                        <use class="ingredients__favorite-svg" href="${s}#icon-heart"></use>\n                    </svg>\n                </button>\n            </div>\n            </li>`)).join("")}s=new URL(i("kyEFX").resolve("8OQ7p"),import.meta.url).toString();const l={list:document.querySelector(".ingredients__list"),notFoundText:document.querySelector(".ingredients__text")};let u=[];function c(e){u=e,l.list.innerHTML="",0===e.length?l.notFoundText.classList.remove("is-hidden"):(l.notFoundText.classList.add("is-hidden"),l.list.insertAdjacentHTML("beforeend",d(e)),f("button.ingredients__learn-more",e,a.showIngredientDetails),f("button.ingredients__favorite",e,g))}function f(e,n,t){document.querySelectorAll(e).forEach((e=>{e.addEventListener("click",(e=>{const r=Number(e.target.parentNode.dataset.index);t(n[r])}))}))}function g(e){o.localFavorites.removeLocal("favingr",e);const n=u.findIndex((n=>n.idIngredient===e.idIngredient));-1!==n&&(u.splice(n,1),c(u))}c(o.localFavorites.getLocal("favingr"));
//# sourceMappingURL=favingredients.20813554.js.map