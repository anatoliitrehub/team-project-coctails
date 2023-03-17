'use strict';
import Notiflix from 'notiflix';

const localFavorites = {

    getLocal(key){
        return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
    },
        
    addLocal(key,obj){
        let loc = (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
        loc.push(obj);
        localStorage.setItem(key,JSON.stringify(loc));
        Notiflix.Notify.success('Item add to favorites successfully');
        return true;
    },

    removeLocal(key,obj){
        let lococ = (localStorage.getItem("favcockt")) ? JSON.parse(localStorage.getItem("favcockt")) : [];
        let tempCoc = [];
        let locin = (localStorage.getItem("favingr")) ? JSON.parse(localStorage.getItem("favingr")) : [];
        let tempIng = [];

        switch (key){
            case "favcockt":
                tempCoc = lococ.filter(item => item.idDrink!==obj.idDrink);
                localStorage.setItem("favcockt",[]);
                localStorage.setItem("favcockt",JSON.stringify(tempCoc));
                Notiflix.Notify.success('Item remove from favorites successfully');
            break;

            case "favingr":
                tempIng = locin.filter(item => item.idIngredient!==obj.idIngredient);
                localStorage.setItem("favingr",[]);
                localStorage.setItem("favingr",JSON.stringify(tempIng));
                Notiflix.Notify.success('Item remove from favorites successfully');
                console.log("remove ing")

            break;

            default:
                Notiflix.Notify.info('Nothing to remove');
 
        }
    }
}

   export {localFavorites};