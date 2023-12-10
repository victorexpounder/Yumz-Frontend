import React, { useEffect, useRef, useState } from 'react'
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
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { SearchBar } from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/userSlice';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

export const AppNavBar = ({addPostOpen, setAddPostOpen}) => {
    const user = useSelector((state) => state.user.currentUser);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const {firstName, lastName, handle} = currentUser;
    const [title, setTitle] = useState();
    const [recipeDetails, setRecipeDetails] = useState();
    const videoInputRef = useRef(null)
    const imageInputRef = useRef(null)
    const textareaRef = useRef(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleVideoClick = () => {
      // Trigger the file input programmatically
      if (videoInputRef.current) {
        videoInputRef.current.click();
      }
    };
    const handleImageClick = () => {
      // Trigger the file input programmatically
      if (imageInputRef.current) {
        imageInputRef.current.click();
      }
    };
    const handleVideoChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedVideo(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    const handleImageChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleTextareaChange = () => {
      if (textareaRef.current) {
        // Set the height of the textarea based on its scrollHeight
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
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
              <div className="addbutton">

                <Tooltip title="Create A Recipe">
                  <IconButton onClick={()=> setAddPostOpen(true)}>
                    <AddBoxIcon style={{color: 'EB5757', fontSize: '2rem'}}/>
                  </IconButton>
                </Tooltip>
              </div>
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
                            {user.firstName}
                            </Avatar>
                        </StyledBadge>

                    </div>
                        {/* Details */}
                    <div className="text">
                    <p>
                       {user.firstName}
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

                  <Link to={'/meal-planning'} style={{textDecoration: "none", color:'#fff'}}>
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

                  <Link  style={{textDecoration: "none", color:'#fff'}} onClick={()=> dispatch(logout())}>
                      <li>
                          <ExitToAppIcon/>
                          <p>Sign Out</p>
                      </li>
                      </Link>
                  </ul>
              </Box>
                
              
            </SwipeableDrawer>


            {/* add post dialog */}
            <Dialog open={addPostOpen} onClose={()=> setAddPostOpen(false)} className='dialog' style={{borderRadius: '50%'}}>
                <div  className='dialogCon'>
                  <div className="dtitle">
                    <h1>
                      Create Your Recipe
                    </h1>
                    <IconButton className='icon' onClick={()=> setAddPostOpen(false)}>
                      <CancelIcon fontSize='large' />
                    </IconButton>
                  </div>

                  <div className="dContent">
                    <div className="user">
                      <Avatar
                        sx={{ bgcolor: '#EB5757', height : '40px', width: '40px', fontSize: "20px"}}
                        alt={firstName}
                        src={girl1}
                      >
                            {firstName.charAt(0)} 
                      </Avatar>
                      <div className="name">
                      <p>{firstName} {lastName}</p>
                      <p> {handle} </p>
                      </div>
                      <TextField 
                      id="outlined-basic" 
                      label="Title" 
                      variant="standard" 
                      fullWidth 
                      type='text'
                      onChange={(e)=> setTitle(e.target.value)}
                      value={title}
                      />
                    </div>

                    <div className="recipeText">
                      <textarea
                      ref={textareaRef}
                      type="text"
                      placeholder='Write Down Your Recipe' 
                      style={{ resize: 'none' }}
                      onChange={(e)=>{setRecipeDetails(e.target.value); handleTextareaChange()}}
                      value={recipeDetails}
                      />
                      {/* vide input  */}
                      <input
                      type="file"
                      accept="video/*"
                      ref={videoInputRef}
                      style={{ display: 'none' }} // Hide the default input file UI
                      onChange={handleVideoChange}
                      />
                      {/* image input  */}
                      <input
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      style={{ display: 'none' }} // Hide the default input file UI
                      onChange={handleImageChange}
                      />

                      {selectedImage &&
                        <div className="imgCon">
                        <img 
                        src={selectedImage} 
                        alt="Selected" 
                        style={{ maxWidth: '100%', maxHeight: '300px' }} 
                        />
                        <IconButton className='remove' onClick={()=> setSelectedImage(null)}>
                          <CancelIcon/>
                        </IconButton>
                        </div>

                      }
                      {selectedVideo &&
                        <div className="vidCon">
                          <video controls width="300" height="200">
                          <source src={selectedVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                          </video>

                          <IconButton className='remove' onClick={()=> setSelectedVideo(null)}>
                          <CancelIcon/>
                          </IconButton>
                        </div>
                      }
                    </div>

                    <div className="addToPost">
                      <p>Add To Recipe</p>
                      <div className="tools">
                        <IconButton onClick={handleVideoClick}>
                          <VideocamOutlinedIcon color='secondary'/>
                        </IconButton>

                        <IconButton onClick={handleImageClick}>
                          <PhotoLibraryIcon color='primary' />
                        </IconButton>
                      </div>
                    </div>

                    <div className={`post ${title && recipeDetails? "active" : "" }`}>
                      Post
                    </div>
                  </div>

                </div>
            </Dialog>
    </div>
  )
}


