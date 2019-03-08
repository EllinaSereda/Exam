"use strict";
function maxvol(prod,res) {
    if (res!==null){
        return prod.filter(v=> v.stock.some(x=>x.vol<=res));
    }
    else return prod;


}

export {maxvol};