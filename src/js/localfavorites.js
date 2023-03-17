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
        let lococ = (localStorage.getItem("favcock")) ? JSON.parse(localStorage.getItem("favcock")) : [];
        let tempCoc = [];
        let locin = (localStorage.getItem("favingr")) ? JSON.parse(localStorage.getItem("favingr")) : [];
        let tempIng = [];

        switch (key){
            case "favcockt":
                // lococ = (localStorage.getItem("favcock")) ? JSON.parse(localStorage.getItem("favcock")) : [];
                // tempCoc = [];
                tempCoc = lococ.filter(item => item.idDrink!==obj.idDrink);
                localStorage.setItem("favcockt",[]);
                localStorage.setItem("favcockt",JSON.stringify(tempCoc));
                Notiflix.Notify.success('Item remove from favorites successfully');
                console.log("remove coc")
            break;

            case "favingr":
                // locin = (localStorage.getItem("favingr")) ? JSON.parse(localStorage.getItem("favingr")) : [];
                tempIng = locin.filter(item => item.idIngredient!==obj.idIngredient);
                localStorage.setItem("favingr",[]);
                localStorage.setItem("favingr",JSON.stringify(tempIng));
                Notiflix.Notify.success('Item remove from favorites successfully');
                console.log("remove ing")

            break;

            default:
                Notiflix.Notify.info('Nothing to remove');
 
        }
        // let loc = (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
        // let temp = [];
        // if(key=='favcockt') temp = loc.filter(item => item.idDrink!==obj.idDrink);
        // if(key=='favingr') temp = loc.filter(item => item.idIngredient!==obj.idIngredient);
        // console.log('temp',temp)
        // localStorage.setItem(key,JSON.stringify(temp));
        // Notiflix.Notify.success('Item remove from favorites successfully');
        // return true;
    }
}

   export {localFavorites};