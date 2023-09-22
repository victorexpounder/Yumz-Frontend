import React, { useEffect, useState } from 'react'
import './AppNavBar.scss'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import girl1 from '../../Assets/girl1.png'
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportIcon from '@mui/icons-material/Support';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { SearchBar } from '../SearchBar/SearchBar';
export const AppNavBar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
      };

    // styled active badge
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));


  const handleScroll = () => {
    const scrollTop = window.scrollY;
    // Adjust this value based on your requirements
    const triggerOffset = 30;

    if (scrollTop > triggerOffset) {
      setIsSticky(true);
      
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${isSticky? 'sticky' : ''}`} >
        <div className="navContent">
            <div className="hamlogo">
                {/* hamburger */}
                <button onClick={handleDrawerToggle}>
                    <svg id="toggle-menu-open" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" className='toggle'>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                {/* logo */}
                <h1>
                    YU<span>MZ</span> 
                </h1>
            </div>

            {/* searchBar */}
            <div className="navSearchBar">
            <SearchBar />
            </div>

            {/* Avatar  */}
            <div className="avatarCon">
              <Link to={'/profile'}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                    <Avatar
                    sx={{ bgcolor: '#EB5757' }}
                    alt="Remy Sharp"
                    src={girl1}
                    >
                    B
                    </Avatar>
                </StyledBadge>
              </Link>
            </div>

        </div>

        {/* Material UI Drawer */}

        <SwipeableDrawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} onOpen={handleDrawerToggle} className='drawApp'>
            
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={handleDrawerToggle}
              className="drawerContentApp"
            >
  
                  <ul >
                    <li className='account'>
                    <div className="avatarCon">
                        {/* avatar */}
                        <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        >
                            <Avatar
                            sx={{ bgcolor: '#EB5757', width: '48px', height: '48px'}}
                            alt="Remy Sharp"
                            src={girl1}
                            >
                            B
                            </Avatar>
                        </StyledBadge>

                    </div>
                        {/* Details */}
                    <div className="text">
                    <p>
                        Victor
                    </p>
                    <a href="">Manage account</a>
                    </div>
                    </li>

                  <Link to={'/feed'} style={{textDecoration: "none", color:'#fff'}}>
                      <li>
                            <HomeIcon/>
                          <p className='red'>Feed</p>
                      </li>
                  </Link>    
  
                  <Link to={'/favorites'} style={{textDecoration: "none", color:'#fff'}}>
                      <li>
                          <FavoriteIcon/>
                          <p>Favorites</p>
                      </li>
                  </Link>

                  <Link to={'/services'} style={{textDecoration: "none", color:'#fff'}}>
                      <li>
                          <DinnerDiningIcon/>
                          <p>Meal Planning</p>
                      </li>
                  </Link>

                  <Link to={'/login'} style={{textDecoration: "none", color:'#fff'}}>
                      <li>
                          <SupportIcon/>
                          <p>Help</p>
                      </li>
                      </Link>

                  <Link to={'/login'} style={{textDecoration: "none", color:'#fff'}}>
                      <li>
                          <ExitToAppIcon/>
                          <p>Sign Out</p>
                      </li>
                      </Link>
                  </ul>
              </Box>
                
              
            </SwipeableDrawer>
    </div>
  )
}


