"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import Product from '../components/Product/Product';

test('работа Product', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <Product img={["#","#"]} prod={{brand:"Carol",code:0,img:["#","#"],info:"parfume",name:"Good",sex:"w",stock:[{in:0,price:122,vol:30}]}}/>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
