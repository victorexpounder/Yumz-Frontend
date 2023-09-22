import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import eto from "../../Assets/eto.png"
import fd from "../../Assets/fd.png"
import bq from "../../Assets/bq.png"
import "./Services.scss"
export const Services = () => {
  return (
    <div className='servicesContainer'>
        <NavBar page={'services'} />
        <div className="servicesContent">
            <div className="headingContainer">
                <p>WHAT WE SERVE</p>
                <h1>Your Favorite Food Delivery Partner</h1>
            </div>

            <div className="services">
                <div className="eto">
                    <img src={eto} alt="" style={{width: '13.4rem', height: '12.5rem'}}/>
                    <div className="text">
                        <h1>Easy To Order</h1>
                        <p>You only need a few clicks in ordering food</p>
                    </div>
                </div>

                <div className="eto">
                    <img src={fd} alt="" style={{width: '13.4rem', height: '12.5rem'}}/>
                    <div className="text">
                        <h1>Fastest Delivery</h1>
                        <p>Delivery that is always ontime even faster</p>
                    </div>
                </div>

                <div className="eto">
                    <img src={bq} alt="" style={{width: '13.4rem', height: '12.5rem'}}/>
                    <div className="text">
                        <h1>Best Quality</h1>
                        <p>Not only fast for us quality is also number one</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
