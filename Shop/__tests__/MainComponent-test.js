"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import MainComponent from '../components/MainComponent/MainComponent';
import { BrowserRouter } from 'react-router-dom';

test('работа Main', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <BrowserRouter><MainComponent user={{info:{a:{buy:{},email:"a", name:"a", order:{}}}}}/></BrowserRouter>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  
    
});
