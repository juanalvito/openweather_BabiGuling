import React, { Component } from "react";


import ForecastTiles from "./ForecastTiles";


const WeatherForecast = ({ data }) => {

    const { city, list } = data;
    // const { name } = city;
  console.log (list)
  console.log (data)
    return (
      <div className="weather-forecast-wrapper">
      
        <ForecastTiles forecasts={list} />
      </div>
    );
};

export default WeatherForecast;