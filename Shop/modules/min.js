"use strict";
function min(prod,minpr) {
    if (minpr!==null){
        return prod.filter(v=> v.stock.some(x=>x.price>=minpr));
    }
    else return prod;

}

export {min};
