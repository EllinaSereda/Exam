"use strict";
function brand(prod,res) {
    if (res.length!=0){
        return prod.filter(v=> res.some(x=>x==v.brand));
    }
    else return prod;

}

export {brand};
