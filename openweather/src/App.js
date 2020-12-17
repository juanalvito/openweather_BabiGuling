import './App.css';
import background from './background.jpg';
import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Forecasticon from '@material-ui/icons/WbSunny';
import { Link } from "react-router-dom";
import axios from 'axios';
import Polutionicon from '@material-ui/icons/FilterDrama';
import HomeIcon from '@material-ui/icons/Home';
import coff from './coff.png';
import foff from './foff.png';
import Switch from '@material-ui/core/Switch';
import Aboutus from './aboutus';
import InfoIcon from '@material-ui/icons/Info';


const api = {
  key: "da02638594a59f25557527b8e6cd869d",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  useEffect (()=> {
  
async function showPosition(position){
  try {
    
    const latitude =  position.coords.latitude 
    const longitude = position.coords.longitude

    console.log(latitude,longitude)
    
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
      res.data.main.temp -= 273

      setWeather(res.data); 
      console.log(res)
  } catch (error) {
      console.log(error)
  }
}
    function getLocation() {
      if (navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition(showPosition));
      } else {
         alert('Error')
      }
    }
    
    getLocation()
  }, [])

  

  const [isFah, setisFah] = useState('false');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result); 
          console.log(result);
        });
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to = "/forecast">
          <ListItem button style={{color: "black"}}>
            <ListItemIcon>  <Forecasticon /></ListItemIcon>
            <ListItemText primary = "Forecast" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to = "/polution">
          <ListItem button style={{color: "black"}}>
            <ListItemIcon>  <Polutionicon/></ListItemIcon>
            <ListItemText primary = "Polution" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to = "/home">
          <ListItem button style={{color: "black"}}>
            <ListItemIcon>  <HomeIcon/></ListItemIcon>
            <ListItemText primary = "Home" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to = "/Aboutus">
          <ListItem button style={{color: "black"}}>
            <ListItemIcon>  <InfoIcon/></ListItemIcon>
            <ListItemText primary = "About Us" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    isFah ? getFah() : getCel()

      setisFah(!isFah)
  };

  const getFah = () =>{
    const newTemp = (weather.main.temp * 9 / 5) +32;
    setWeather({
      ...weather, main: {...weather.main, temp: newTemp } 
    })
  }
  const getCel = () => {
    const newTemp = (weather.main.temp - 32)  * 5 / 9;
    setWeather({
      ...weather, main: {...weather.main, temp: newTemp } 
    })
  }


  return (
    <div className="app">
      {['Menu'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} className="menubutton">{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
        <Switch
            className ="switch"
            checked={state.Fahrenheit}
            onChange={handleChange}
            color="secondary"
            name="Fahrenheit"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        <img className="celsius" src={coff}></img>
        <img className="fahrenheit" src={foff}></img>
      <main>
        <div className="searchbox">
          <input type="text" className="search" placeholder="Search country or city here..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
            <div className="location-place">
              <div className="location">{weather.name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="suhu-place">
              <div className="suhu">
                {Math.round(weather.main.temp)}{isFah ? <span>&#8451;</span> : <span>&#8457;</span> } 
              </div>
            </div>
            <div className="weather-place">
              <img className="city-icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
              <div className="weather">
                {weather.weather[0].description}
              </div>
            </div>
        </div>  
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
