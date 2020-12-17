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
import InfoIcon from '@material-ui/icons/Info';
import Git from './GitHub.png';

function Aboutus () { 
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
              <Button onClick={toggleDrawer(anchor, true)} className="menubutton">{anchor}</Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
            
            
          <main>
              <div className ="About">
                <h1 className="US">About Us</h1>
                
            <div className = "Nama1">
                <h1><a href="https://github.com/jhrjason1"><img src={Git} className= "git" ></img></a> Jason Haryanto</h1>
                <p>00000037352</p>

            </div>
            <div className = "Nama2">
                <h1><a href="https://github.com/juanalvito"><img src={Git} className= "git" ></img></a> Juan Alvito</h1>
                <p>00000037193</p>
            </div>
            <div className = "Nama3">
                <h1><a href="https://github.com/LeonardoSteven"><img src={Git} className= "git" ></img></a> Leonardo Steven</h1>
                <p>00000037279</p>
            </div>
            <div className = "Nama4">
                <h1><a href="https://github.com/HillaryDorotheaKristianto"><img src={Git} className= "git" ></img></a> Hillary Dorothea K</h1>
                <p>00000037192</p>
            </div>
            <br></br>
            <br></br>

            <div className="Special">
                <h1>Special Thanks To : </h1> 
            </div>
            <div className ="shifu">
                <h1><a href="https://github.com/andibalo"><img src={Git} className= "git" ></img></a> Shifu Andi Usman Balo</h1>
                <h2> Pogchamp </h2>
                <p></p>
            </div>
            </div>
          </main>
        </div>
      );
    }


export default Aboutus;
