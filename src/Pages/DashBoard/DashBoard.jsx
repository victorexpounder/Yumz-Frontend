
import React, { useEffect, useState } from 'react'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import { Categories } from '../../Components/Categories/Categories'
import './DashBoard.scss'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios'
import { Alert, Snackbar } from '@mui/material'
export const DashBoard = () => {

  const [isSticky, setIsSticky] = useState(false);
  const [recipePostData, setRecipePostData] = useState();
  const [recipeFetchSuccess, setrecipeFetchSuccess] = useState(false);
  const [recipeFetchfailure, setrecipeFetchfailure] = useState(false);
  const [recipeFetchLoading, setrecipeFetchLoading] = useState(false);

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
  
    
    const fetchData = async() =>{
      try{
        setrecipeFetchLoading(true);
        const res = await axios.get('recipes/random')
        console.log(res.data)
        setRecipePostData(res.data)
        setrecipeFetchLoading(false);
        setrecipeFetchSuccess(true);
      }catch(err){
        setrecipeFetchLoading(false);
        setrecipeFetchfailure(true);
        console.log(err)
      }
    }

    
    useEffect(()=>{
      fetchData();
    }, [])
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
        <RecipePosts recipePostData={recipePostData} Fetchfailure={recipeFetchfailure} FetchSuccess={recipeFetchSuccess} fetchLoading={recipeFetchLoading}/>

        <div className="addButton">
            <AddOutlinedIcon style={{fontSize: '2.5rem', backgroundColor: '#EB5757', color: '#fff', borderRadius: '50%', padding: '0.3rem'}} />
        </div>
      </div>

      <Snackbar open={recipeFetchSuccess} autoHideDuration={2000} onClose={()=> setrecipeFetchSuccess(false)}>
        <Alert onClose={()=> setrecipeFetchSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Recipes Loaded
        </Alert>
      </Snackbar>

      <Snackbar open={recipeFetchfailure} autoHideDuration={6000} onClose={()=> setrecipeFetchfailure(false)}>
        <Alert onClose={()=> setrecipeFetchfailure(false)} severity="error" sx={{ width: '100%' }}>
          Recipes failed to load, please refresh
        </Alert>
      </Snackbar>
    </div>
  )
}
