"use strict";
function sex(prod,res) {
    if (res.length!=0){
        return prod.filter(v=> res.some(x=>x==v.sex));
    }
    else return prod;

}

export {sex};