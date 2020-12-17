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
import InfoIcon from '@material-ui/icons/Info';




const api = {
  key: "da02638594a59f25557527b8e6cd869d",
  base: "http://api.openweathermap.org/data/2.5/"
}

function Polution() {
  useEffect (()=> {
  
async function showPosition(position){
  try {
    
   const latitude =  position.coords.latitude 
    const longitude = position.coords.longitude
    console.log(latitude,longitude)
    
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
      const raze = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
      
      const data = {
        pm2_5: res.data.list[0].components.pm2_5 ,
        pm10: res.data.list[0].components.pm10 ,
        aqi: res.data.list[0].main.aqi *= 10 , 
        name : raze.data.name ,
    }
      setWeather(data); 
      console.log(res)
      console.log(raze)
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
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          const {lat, lon} = result.coord
          console.log(lat,lon)
          let data = { name:result.name}
          //setWeather({name: result.name})
          fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api.key}`)
          .then(res=>res.json())
          .then(res=>{
            console.log(res)
            setWeather({...data,pm2_5: res.list[0].components.pm2_5 ,
              pm10: res.list[0].components.pm10 ,
              aqi: res.list[0].main.aqi *= 10 ,  })
          })
          
         // setQuery('');
          //setWeather(result); 
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
          <ListItem button  style={{color: "black"}}>
            <ListItemIcon>  <Forecasticon /></ListItemIcon>
            <ListItemText primary = "Forecast" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to = "/polution">
          <ListItem button  style={{color: "black"}}>
            <ListItemIcon>  <Polutionicon/></ListItemIcon>
            <ListItemText primary = "Polution" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to = "/home">
          <ListItem button  style={{color: "black"}}>
            <ListItemIcon>  <HomeIcon/></ListItemIcon>
            <ListItemText primary = "Home" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to = "/Aboutus">
          <ListItem button  style={{color: "black"}}>
            <ListItemIcon>  <InfoIcon/></ListItemIcon>
            <ListItemText primary = "About Us" />
          </ListItem>
        </Link>
      </List>
    </div>
      
     
  
  );
  return (
    <div className="app">
      {['Menu'].map((anchor) => (
  <React.Fragment key={anchor}>
    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
      {list(anchor)}
    </Drawer>
  </React.Fragment>
))}
      <main>
     
        <div className="searchbox">
          <input type="text" className="search" placeholder="Search country or city here..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
        </div>
        {weather ? (
              <div>
                 <div className="location-place">
                 <div className="location">{weather.name}</div>
                 <div className="date">{dateBuilder(new Date())}</div>
               </div>
               <div className ="Box">
               <div className="aqi">
            <p>  Air Quality Index :{weather.aqi}</p>  
            </div>
             <div className="pm2">
                  <p>  Particulate Matter 2.5 mm :{weather.pm2_5}</p>  
              </div>
              <div className="pm10">
                <p>  Particulate Matter 10 mm:{weather.pm10}</p>  
              <div className="pm10">
                  </div>
            </div>
           
            </div>
        </div>  
        ) : ('')}
      </main>
    </div>
  );
}

export default Polution;
