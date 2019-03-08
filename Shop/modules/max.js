"use strict";
function max(prod,maxpr) {
    if (maxpr!==null){
        return prod.filter(v=> v.stock.some(x=>x.price<=maxpr));
    }
    else return prod;
}

export {max};
