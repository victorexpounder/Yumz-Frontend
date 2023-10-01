import React, { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss'
import { Box, SwipeableDrawer } from '@mui/material';
import { Link } from 'react-router-dom';
export const Header = () => {
    // drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className='header'>
        <div className="HeaderContainer">
            {/* logo div */}
            <div className="logo">
                <a href="/">
                <h1>Scrolly</h1>
                </a>
            </div>
            <div className="navLinks">
                <ul>
                    <a href=''><li>Tutor</li></a>
                    <a href=''><li>About Us</li></a>
                    <a href=''><li>Contact Us</li></a>
                </ul>
                <div className="registerButton">
                    <p>Register</p>
                </div>
            </div>
            {/* menu icon for mobile */}
            <div className="menuIcon" onClick={()=>setDrawerOpen(true)}>
                <MenuIcon/>
            </div>

            {/* sidebar drawer for mobile */}
            <SwipeableDrawer
            anchor={'right'}
            open={drawerOpen} 
            onClose={()=>setDrawerOpen(false)}
            onOpen={()=>setDrawerOpen(true)}
            className='drawer'
            >
            <Box
            sx={{ width: 250 }}
            role="presentation"
            className="drawerContainer"
          >

                <ul >
                    <a href='' style={{textDecoration: "none", color: "#fff"}}><li>Tutor</li></a>
                    <a href='' style={{textDecoration: "none", color: "#fff"}}><li>About Us</li></a>
                    <a href='' style={{textDecoration: "none", color: "#fff"}}><li>Contact Us</li></a>
                </ul>
            </Box>
            </SwipeableDrawer>
            

        </div>

        
    </div>
    
  )
}
