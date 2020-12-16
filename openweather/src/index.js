import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import ForecastHour from './forecast.js';
import Polution from './polution.js';



ReactDOM.render(
  <React.StrictMode>
    <Router> 
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path ="/forecast">
            <ForecastHour/>
          </Route>
          <Route exact path="/polution">
            <Polution/>
          </Route>
          <Route exact path="/home">
          <App/>
          </Route>
        </Switch>
      
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
