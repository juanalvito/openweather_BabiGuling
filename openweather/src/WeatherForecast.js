import React, { Component } from "react";
import './main.css';

import ForecastTiles from "./ForecastTiles";


const WeatherForecast = ({ data }) => {
 const { city, list } = data.data

    // const { name } = city;
 // console.log (list)
 // console.log (data)
    return (
      <div className="weather-forecast-wrapper">
      <h1>{city.name} Weather Forecast</h1>
      
      <ForecastTiles forecasts={list} />
      </div>
    );
};

export default WeatherForecast;