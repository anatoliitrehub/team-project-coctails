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
        const temp = loc.filter(item => item.idDrink!==obj.idDrink);
        console.log('temp',temp)
        localStorage.setItem(key,JSON.stringify(temp));
    }
}

   export {localFavorites};