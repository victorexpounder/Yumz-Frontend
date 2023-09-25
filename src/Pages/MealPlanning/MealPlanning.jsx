import React from 'react'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import working from '../../Assets/working.png'
import './MealPlanning.scss'
export const MealPlanning = () => {
  return (
    <div>
        <AppNavBar/>
        <div className="MealContent">
            <img src={working} alt="" />
            <h3>This Page is currently in construction</h3>
            <p>We are working tirelessly to develop this feature and ship it on time</p>
        </div>
    </div>
  )
}
