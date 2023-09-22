import React, { useEffect, useState } from 'react'
import logo from '../../Assets/logo.png'
import './NavBar.scss'
import Slide from '@mui/material/Slide';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
export const NavBar = ({page}) => {
    const [checked, setChecked] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(()=>{
    setChecked(true);
  }, [])

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    
    <div className='NavContainer'>
        <Slide direction="down" in={checked} mountOnEnter unmountOnExit>

        
        <div className="navContent">
            <div className="navBranding">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <h1>Yumz</h1>
            </div>

            <div className="navLinks">
                <ul>
                <Link to={'/'} style={{textDecoration: "none", color:'#333333'}}>

                    <li>
                        <p className={page === 'index'? 'red' :'' }>Why Yumz?</p>
                        <div className="dot">
                        {page === 'index'? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#EB5757"/>
                        </svg>
                        :
                        ''
                    }
                        </div>
                    </li>
                    </Link>

                    <Link to={'/services'} style={{textDecoration: "none", color:'#333333'}}>
                    <li>
                        <p className={page === 'services'? 'red' :'' }>Services</p>
                        <div className="dot">
                        {page === 'services'? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#EB5757"/>
                        </svg>
                        :
                        ''
                        }
                        </div>
                    </li>
                    </Link>

                    
                </ul>
            </div>

        <div className="others">

            {/* bag */}
            <div className="bag">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
            <path d="M2.64528 9.02004C2.68215 8.56061 2.89072 8.13193 3.22945 7.81936C3.56818 7.50679 4.01221 7.33328 4.47311 7.33337H15.5263C15.9872 7.33328 16.4312 7.50679 16.7699 7.81936C17.1087 8.13193 17.3172 8.56061 17.3541 9.02004L18.0902 18.1867C18.1104 18.439 18.0782 18.6927 17.9956 18.9319C17.913 19.1711 17.7818 19.3906 17.6101 19.5766C17.4385 19.7626 17.2303 19.911 16.9985 20.0126C16.7667 20.1142 16.5164 20.1666 16.2633 20.1667H3.73611C3.48304 20.1666 3.23273 20.1142 3.00093 20.0126C2.76913 19.911 2.56087 19.7626 2.38925 19.5766C2.21764 19.3906 2.08639 19.1711 2.00377 18.9319C1.92115 18.6927 1.88895 18.439 1.9092 18.1867L2.64528 9.02004V9.02004Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.6663 10.0834V5.50004C13.6663 4.52758 13.28 3.59495 12.5924 2.90732C11.9048 2.21968 10.9721 1.83337 9.99967 1.83337C9.02721 1.83337 8.09458 2.21968 7.40695 2.90732C6.71932 3.59495 6.33301 4.52758 6.33301 5.50004V10.0834" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            
            <Link to={'/login'} style={{textDecoration: "none", color:'#fff'}}>
            <div className="loginButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M13.5 15.5H7.5C7.23478 15.5 6.98043 15.3946 6.79289 15.2071C6.60536 15.0196 6.5 14.7652 6.5 14.5V13H7.5V14.5H13.5V2.5H7.5V4H6.5V2.5C6.5 2.23478 6.60536 1.98043 6.79289 1.79289C6.98043 1.60536 7.23478 1.5 7.5 1.5H13.5C13.7652 1.5 14.0196 1.60536 14.2071 1.79289C14.3946 1.98043 14.5 2.23478 14.5 2.5V14.5C14.5 14.7652 14.3946 15.0196 14.2071 15.2071C14.0196 15.3946 13.7652 15.5 13.5 15.5Z" fill="#F2F2F2" stroke="#F2F2F2" stroke-width="0.5"/>
            <path d="M7.795 10.795L9.585 9H2.5V8H9.585L7.795 6.205L8.5 5.5L11.5 8.5L8.5 11.5L7.795 10.795Z" fill="#F2F2F2" stroke="#F2F2F2" stroke-width="0.5"/>
            </svg>

            <p>Login</p>
            </div>
            </Link>

            <button id="toggle-button" class="toggleButton" onClick={handleDrawerToggle}>
                <svg id="toggle-menu-open" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" className='toggle'>
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>

                <svg id="toggle-menu-close" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" className='toggle hidden'>
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            {/* Material UI Drawer */}
          <SwipeableDrawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} onOpen={handleDrawerToggle} className='draw'>
            
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={handleDrawerToggle}
            className="drawerContent"
          >

                <ul >
                <Link to={'/'} style={{textDecoration: "none", color:'#fff'}}>
                    <li>
                        <p className='red'>Why Yumz?</p>
                    </li>
                </Link>    

                <Link to={'/services'} style={{textDecoration: "none", color:'#fff'}}>
                    <li>
                        <p>Services</p>
                        
                    </li>
                </Link>
                <Link to={'/login'} style={{textDecoration: "none", color:'#fff'}}>
                    <li>
                        <p>Login</p>
                    </li>
                    </Link>
                </ul>
            </Box>
              
            
          </SwipeableDrawer>

        </div>

            
        </div>
        </Slide>
    </div>
  )
}
