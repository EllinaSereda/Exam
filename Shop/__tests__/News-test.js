"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import News from '../components/News/News';
import { BrowserRouter } from 'react-router-dom';

test('работа News', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
   <BrowserRouter><div><News news={{code:0,info:'новость',name:'новость1',url:'#'}}/></div></BrowserRouter>
  );


  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();


});
