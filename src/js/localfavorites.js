'use strict';

const localFavorites = {

    getLocal(key){
        return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
    },
        
    addLocal(key,obj){
        let loc = (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
        loc.push(obj);
        localStorage.setItem(key,JSON.stringify(loc));
    },

    removeLocal(key,obj){
        let loc = (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : [];
        let temp = [];
        if(key=='favcockt') temp = loc.filter(item => item.idDrink!==obj.idDrink);
        if(key=='favingr') temp = loc.filter(item => item.idIngredient!==obj.idIngredient);
        console.log('temp',temp)
        localStorage.setItem(key,JSON.stringify(temp));
    }
}

   export {localFavorites};