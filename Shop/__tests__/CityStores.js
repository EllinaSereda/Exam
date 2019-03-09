"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import CityStores from '../components/CityStores';

test('работа CityStores', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
   <CityStores info={{code:0,name:'a',shops:[{adress:'адрес1',code:100,tel:['1','2'],time:['m','t'],img:['#1','#2']},
   {adress:'адрес2',code:102,tel:['1','2'],time:['m','t'],img:['#1','#2']}]}}/>
  );


  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();


});
