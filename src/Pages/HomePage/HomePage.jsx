import React, { useEffect, useState } from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import './HomePage.scss'
import berry from '../../Assets/berry.png'
import woman from '../../Assets/woman.png'
import { Reviews } from '../../Components/Reviews/Reviews'
import foodWidget from '../../Assets/foodWidget.png'
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom'
import share from '../../Assets/share.svg'
export const HomePage = () => {
  const [checked, setChecked] = useState(false)

  useEffect(()=>{
    setChecked(true);
  }, [])
  return (
    <div>
        <NavBar page={'index'} />
        <div className="homeContent">
        <Fade in={checked} style={{ transformOrigin: '0 0 0' }}
    {...(checked ? { timeout: 1500 } : {})}>
        <div className="leftDetails">

          <div className="fastWidget">
            <div className="content">
            <p>Various Types Recipes</p>
            <img src={berry} alt="" />
            </div>
          </div>

          <div className="infoContainer">

          {/* heading text */}
          
          <h1>
            Share, Learn, And Explore <span>Recipes</span>
          </h1>
          

          {/* paragraph text */}
          <p className='iText'>
            Share recipe content, connect and learn from a vast list of recipes
          </p>
          {/* buttons */}

          <div className="buttonsContainer">
          <Link to={'/signup'} style={{textDecoration: "none", color:'#fff'}}>
            <div className="getStarted">
              <p>Get Started</p>
            </div>
          </Link>
            <div className="watch">
              <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.235 2.192C6.00672 2.06368 5.74882 1.99736 5.48695 1.99964C5.22508 2.00192 4.96837 2.07271 4.74236 2.20498C4.51634 2.33726 4.32889 2.5264 4.19865 2.75359C4.06842 2.98079 3.99993 3.23812 4 3.5V12.5C4.0001 12.7618 4.06872 13.019 4.19903 13.2461C4.32934 13.4731 4.5168 13.6621 4.74279 13.7943C4.96878 13.9264 5.22542 13.9971 5.4872 13.9994C5.74898 14.0016 6.00679 13.9353 6.235 13.807L14.235 9.307C14.4668 9.17646 14.6597 8.98662 14.794 8.75695C14.9282 8.52727 14.999 8.26603 14.999 8C14.999 7.73397 14.9282 7.47272 14.794 7.24305C14.6597 7.01337 14.4668 6.82354 14.235 6.693L6.235 2.193V2.192Z" fill="#F2C94C"/>
              </svg>
              </div>
              <p >watch Video</p>
            </div>
          </div>
          </div>

          <Reviews/>

          <img src={foodWidget} alt="" className='foodWidget'/>
        </div>
        </Fade>
        
        <div className="rightDetails">
          <Fade in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
        <img src={share} alt="" />
          </Fade>

          
        <svg xmlns="http://www.w3.org/2000/svg" width="82" height="113" viewBox="0 0 82 113" fill="none" className='arrow'>
        <path d="M14.2222 111.5C34.2222 99.8333 67.8222 70.3 42.2222 45.5C10.2222 14.5 -16.2778 82.5 18.2222 88.5C52.7222 94.5 107.222 51 64.2222 1" stroke="#F2C94C" stroke-width="3" stroke-linejoin="round" stroke-dasharray="8 8"/>
        </svg>
          
         
          
        <div className="rectangle-8" style={{position: "absolute"}}></div>
        <div className="rectangle-8"></div>
        </div>

        </div>
    </div>
  )
}
