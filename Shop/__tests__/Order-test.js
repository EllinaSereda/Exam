"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import Order from '../components/Order/Order';

test('работа Order', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <Order user={{name:"aa",email:"eee",order:{30:2}}} products={[{brand:"Carol",code:0,img:["#","#"],info:"parfume",name:"Good",sex:"w",stock:[{in:5,price:122,vol:30}]}]}/>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  
    
});
