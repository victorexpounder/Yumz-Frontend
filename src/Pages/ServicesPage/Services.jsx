import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import eto from "../../Assets/eto.png"
import fd from "../../Assets/fd.png"
import bq from "../../Assets/bq.png"
import upload from "../../Assets/upload.svg"
import learn from "../../Assets/learn.svg"
import engage from "../../Assets/engage.svg"
import "./Services.scss"
export const Services = () => {
  return (
    <div className='servicesContainer'>
        <NavBar page={'services'} />
        <div className="servicesContent">
            <div className="headingContainer">
                <p>WHAT WE SERVE</p>
                <h1>Let The World See That Hobby</h1>
            </div>

            <div className="services">
                <div className="eto">
                    <img src={upload} alt="" style={{width: '13.4rem', height: '12.5rem'}}/>
                    <div className="text">
                        <h1>Upload Recipes</h1>
                        <p>Upload vidoes, images, and text in a few clicks</p>
                    </div>
                </div>

                <div className="eto">
                    <img src={learn} alt="" style={{width: '13.4rem', height: '12.5rem'}}/>
                    <div className="text">
                        <h1>Learn & Enjoy</h1>
                        <p>Learn and enjoy from our vast list of recipe content</p>
                    </div>
                </div>

                <div className="eto">
                    <img src={engage} alt="" style={{width: '13.4rem', height: '12.5rem'}}/>
                    <div className="text">
                        <h1>Engage</h1>
                        <p>share your thoughts on recipes in our interactive comment section</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
