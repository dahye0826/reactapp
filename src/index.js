import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import App from './App';
//import App from './example/App_arrow_function';
//mport App from './example/App_map';
//import App from './example/ClicktestFile';
// import App from './example/App_useState_01';
//import App from './minishop/coffee_bread_01/App';
//import App from './minishop/coffee_bread_02/App';
//import App from './minishop/coffee_bread_03/App';
//import App from './minishop/coffee_bread_04/App';
//import App from './minishop/coffee_bread_05/App';
// import App from './minishop/coffee_bread_06/App';
//import App from './minishop/coffee_bread_07/App';
//import App from './minishop/coffee_bread_08/App';
import App from './reactAndSpring/App';



import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // strictMode는 개발 도중 발생하는 문제를 좀 더 감지하기 위해 redering을 2번 수행합니다.
  <BrowserRouter>

  <App />

 </BrowserRouter>
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
