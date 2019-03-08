"use strict";
function sort(prod,type) {
    switch (type){
        case 0: 
        prod=prod.sort((a,b)=>  {
          return a.code-b.code;
        });
        break;
        case 1:
        prod=prod.sort((a,b)=>{
          if ( a.name<b.name )  return -1;
          if ( a.name>b.name )  return 1;
          return 0;});
        break;
        case 2:
        prod=prod.sort((a,b)=>{
          if ( a.name<b.name )  return 1;
          if ( a.name>b.name )  return -1;
          return 0;});
        break;
        case 3:
        prod=prod.sort((a,b)=>  {
          return Math.min.apply(null,a.stock.map(v=>v.price))-Math.min.apply(null,b.stock.map(v=>v.price));
        });
        break;
        case 4:
        prod=prod.sort((a,b)=>  {
          return Math.min.apply(null,b.stock.map(v=>v.price))-Math.min.apply(null,a.stock.map(v=>v.price));
        });
        break;
        case 5:
        prod=prod.sort((a,b)=>{
          if ( a.brand<b.brand )  return -1;
          if ( a.brand>b.brand )  return 1;
          return 0;});
        break;
        case 6:
        prod=prod.sort((a,b)=>{
          if ( a.brand<b.brand )  return 1;
          if ( a.brand>b.brand )  return -1;
          return 0;});
        break;
      }
      return prod;
}

export {sort};
