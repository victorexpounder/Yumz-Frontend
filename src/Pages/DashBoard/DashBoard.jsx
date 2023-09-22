
import React, { useEffect, useState } from 'react'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import { Categories } from '../../Components/Categories/Categories'
import './DashBoard.scss'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts'
export const DashBoard = () => {

  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    // Adjust this value based on your requirements
    const triggerOffset = 252;

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
    <div>
      {/* navBar */}
      <AppNavBar/>

      {/* other app content */}
      <div className="contentApp">
        {/* categories */}
        <Categories/>

        {/* searchBar */}
        <div className={`contentSearch ${isSticky? 'sticky' : ''}`}>
        <SearchBar />
        </div>

        <hr />

        {/* Recipe Posts */}
        <RecipePosts/>
      </div>
    </div>
  )
}
