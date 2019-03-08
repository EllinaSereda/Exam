"use strict";

import {maxvol} from '../../modules/maxvol';

test('проверка фильтрации по макс объему', () => {


// По коду

  expect(maxvol([ {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
  {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]}], 10)).toEqual(
    []
  ); 
 
  expect(maxvol([ {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
  {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]}], 50)).toEqual(
    [{brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},]
  ); 
  expect(maxvol([ {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
  {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
  {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
  {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]}], 300)).toEqual(
    [{brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
    {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]}]
  ); 
  


});
