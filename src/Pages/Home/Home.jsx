import React from 'react'
import { Header } from '../../Components/Header/Header'
import './Home.scss'

import { InfoSection } from '../../Components/InfoSection/InfoSection'
export const Home = () => {
  return (
    <div>
        <Header/>
        {/* info section */}
        <InfoSection/>
    </div>
  )
}
