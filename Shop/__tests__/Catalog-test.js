"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import Catalog from '../components/Catalog/Catalog';
import { BrowserRouter } from 'react-router-dom';

test('работа Main', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <BrowserRouter><Catalog products={[{brand:"Carol",code:0,img:["#","#"],info:"parfume",name:"Good",sex:"w",stock:[{in:0,price:122,vol:30}]}]}/></BrowserRouter>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку

  // получаем уже изменённый снэпшот


  
    
});
