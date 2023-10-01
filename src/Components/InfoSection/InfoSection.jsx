import React from 'react'
import './InfoSection.scss'
import rightImg from '../../Assets/rightImg.png'
export const InfoSection = () => {
  return (
    <div className='infoSection'>
        <div className="infoContainer">
          <div className="leftDetails">
            <div className="detailsContent">
                <h1>Empower your Potential With Scrolly.</h1>
                <p>Access High-Quality Videos Courses, Designed Specifically for Tertiary Institution Students Across Africa.
                  <span>
                  Join a Growing Community, Get Peer Insights, and Discover Exciting Business Opportunities and Collaborations.
                  </span>
                  
                </p>
            </div>
            <div className="ctas">
                <div className="startLearning">Start Learning Today</div>
                <div className="learnMore">Learn More</div>
            </div>
          </div>
          <div className="rightImg">
              <img src={rightImg} alt="" />
          </div>
        </div>
    </div>
  )
}
