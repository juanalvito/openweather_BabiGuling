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
              <ListItem button>
                <ListItemIcon>  <Forecasticon /></ListItemIcon>
                <ListItemText primary = "Forecast" />
              </ListItem>
            </Link>
          </List>
          <List>
            <Link to = "/polution">
              <ListItem button>
                <ListItemIcon>  <Polutionicon/></ListItemIcon>
                <ListItemText primary = "Polution" />
              </ListItem>
            </Link>
          </List>
          <List>
            <Link to = "/home">
              <ListItem button>
                <ListItemIcon>  <HomeIcon/></ListItemIcon>
                <ListItemText primary = "Home" />
              </ListItem>
            </Link>
          </List>
          <List>
            <Link to = "/Aboutus">
              <ListItem button>
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
              <div className ="gay">
            <div className = "Nama1">
                <h1>Jason Haryanto</h1>
                <p>00000037352</p>
            </div>
            <div className = "Nama2">
                <h1>Juan Alvito</h1>
                <p>00000037193</p>
            </div>
            <div className = "Nama3">
                <h1>Leonardo Steven</h1>
                <p>00000037279</p>
            </div>
            <div className = "Nama4">
                <h1>Hillary Dorothea K</h1>
                <p>00000037192</p>
            </div>
            <div className="niggandi">
                <h1>Special Thanks To : </h1> 
            </div>
            <div className ="shifu">
                <h1>Shifu Andi Usman Balo</h1>
                <h2> Pogchamp </h2>
                <p></p>
            </div>
            </div>
          </main>
        </div>
      );
    }


export default Aboutus;
