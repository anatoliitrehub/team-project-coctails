'use strict';

function localFavorit() {
    

    const local = {
        localOne: 25,
    
        getLocal(key){
            return localStorage.getItem(key);
        },
        setLocal(key,obj){
            localStorage.setItem(key,obj);
            return "OK"
        }}
        console.log(local.localOne)

        return local
    }

    console.log("local")
    // console.log(local)
    const localFavorites = localFavorit()
    console.log(localFavorites.getLocal('coct'))
    export default localFavorites;



