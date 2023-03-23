'use strict';
import Notiflix from 'notiflix';

const localFavorites = {
    notify: Notiflix.Notify,
    getLocal(key){
        return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
    },
        
    addLocal(key,obj){
        let currentItem = (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
        currentItem.push(obj);
        localStorage.setItem(key,JSON.stringify(currentItem));
        this.notify.success(' 😍 Item was added successfully!');
        // return true;
    },

    removeLocal(key,obj){
        let currentCoc = (localStorage.getItem("favcockt")) ? JSON.parse(localStorage.getItem("favcockt")) : [];
        let temporaryCoc = [];
        let currentIng = (localStorage.getItem("favingr")) ? JSON.parse(localStorage.getItem("favingr")) : [];
        let temporaryIng = [];

        switch (key){
            case "favcockt":
                temporaryCoc = currentCoc.filter(item => item.idDrink!==obj.idDrink);
                // localStorage.setItem("favcockt",[]);
                localStorage.setItem("favcockt",JSON.stringify(temporaryCoc));
                this.notify.success(' ☹️ Cocktail was removed successfully!');
            break;

            case "favingr":
                temporaryIng = currentIng.filter(item => item.idIngredient!==obj.idIngredient);
                // localStorage.setItem("favingr",[]);
                localStorage.setItem("favingr",JSON.stringify(temporaryIng));
                this.notify.success(' ☹️ Ingredient was removed successfully!');

            break;

            default:
                this.notify.info(' 😕 Nothing to remove');
 
        }
    }
}

   export {localFavorites};