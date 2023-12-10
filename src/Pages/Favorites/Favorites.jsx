import React, { useEffect, useState } from 'react'
import './Favorites.scss'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { port } from '../../port'
export const Favorites = () => {

  const [isSticky, setIsSticky] = useState(false);
  const [favorites, setFavorites] = useState();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
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

   const fetchFavorites = async() =>{
        try {
            setLoading(true);
            let tempFavorites = [];
            const favIds = currentUser.favorites;
            console.log(favIds)
            for(let i = 0; i < favIds.length; i++)
            {
                const res = await axios.get(`/api/recipes/find/${favIds[i]}`);
                tempFavorites.push(res.data);
            }
            console.log(tempFavorites)
            setFavorites(tempFavorites);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
}

useEffect(()=>{
  fetchFavorites();
}, [])
  
  return (
    <div>
        <AppNavBar/>
        <div className="favoriteContent">
            <div className={`contentSearch ${isSticky? 'sticky' : ''}`}>
                <SearchBar/>
            </div>
            <h1 className='favText'>Favorites</h1>
            <RecipePosts isFavorites={true} recipePostData={favorites} fetchLoading={loading}/>
        </div>
    </div>
  )
}
