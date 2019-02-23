"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducer from './redux/reducers.js';
import Main from './core/Main';
import firebase from 'firebase';
let config = {
  apiKey: "AIzaSyB7cYheLuVRIEvqvWphMF9jJYCkyg-E1Ls",
  authDomain: "finalproject-d5d17.firebaseapp.com",
  databaseURL: "https://finalproject-d5d17.firebaseio.com",
  projectId: "finalproject-d5d17",
  storageBucket: "finalproject-d5d17.appspot.com",
  messagingSenderId: "891783382735"
};
firebase.initializeApp(config);
let store=createStore(combinedReducer);
ReactDOM.render(
  <Provider store={store}><Main /></Provider>
  
  , document.getElementById('container') 
);
