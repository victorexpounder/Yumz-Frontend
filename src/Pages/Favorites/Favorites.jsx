import React, { useEffect, useState } from 'react'
import './Favorites.scss'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts'
export const Favorites = () => {

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
        <AppNavBar/>
        <div className="favoriteContent">
            <div className={`contentSearch ${isSticky? 'sticky' : ''}`}>
                <SearchBar/>
            </div>
            <h1 className='favText'>Favorites</h1>
            <RecipePosts isFavorites={true}/>
        </div>
    </div>
  )
}
