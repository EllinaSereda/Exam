"use strict";

import {sort} from '../../modules/sort';

test('проверка сортировки товаров', () => {


// По коду
   expect(sort([{brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
  {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}],0)).toEqual(
    [{brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]},
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]}
    ]
  ); 
  //По имени а-я
  expect(sort([ {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}], 1)).toEqual(
    [{brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}
    ]
  ); 
  //По цене по возрастанию
  expect(sort([ {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}], 3)).toEqual(
    [
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]}
    ]
  ); 
  //По цене по убыванию
  expect(sort([{brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
  {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}],4)).toEqual(
    [{brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}
    
    ]
  ); 
  //По названию бренда а-я
  expect(sort([{brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
  {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}],6)).toEqual(
    [{brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]},
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]}]
  );

  


});
