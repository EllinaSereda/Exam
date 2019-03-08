"use strict";

import {brand} from '../../modules/brand';

test('проверка фильтрации по бренду', () => {


// По коду

  expect(brand([ 
        {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
        {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
        {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
        {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]},
    ], ["A","B"])).toEqual(
    [
        {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
        {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
    ]
  ); 
 
  expect(brand([ 
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
    {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]},
], ["C","B"])).toEqual(
[
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]}
]
); 
expect(brand([ 
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
    {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]},
], [])).toEqual(
[
    {brand:"B",code:4,img:["#","#"],info:"parfume",name:"second",sex:"w",stock:[{in:0,price:100,vol:30}]},
    {brand:"A",code:0,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:1333,vol:300}]},
    {brand:"D",code:6,img:["#","#"],info:"parfume",name:"first",sex:"w",stock:[{in:0,price:120,vol:15}]},
    {brand:"C",code:2,img:["#","#"],info:"parfume",name:"third",sex:"w",stock:[{in:0,price:112,vol:80}]},
]
); 
  


});
