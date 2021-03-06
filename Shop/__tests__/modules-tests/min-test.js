"use strict";

import {min} from '../../modules/min';

test('проверка фильтрации по минимальной цене', () => {


// По коду
   expect(min([{brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
  {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:1,vol:30}]}],10)).toEqual(
    [{brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:10,vol:30}]},
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},]
  ); 

  expect(min([ {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:30}]},
  {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:30}]}], 10000)).toEqual(
    []
  ); 
 
  expect(min([ {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:30}]},
  {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:30}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:30}]}], 90)).toEqual(
    [{brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:30}]},
    {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:30}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:30}]}]
  ); 
  
  


});
