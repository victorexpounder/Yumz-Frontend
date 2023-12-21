
import React, { useEffect, useState } from 'react'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import { Categories } from '../../Components/Categories/Categories'
import './DashBoard.scss'
import { SearchBar } from '../../Components/SearchBar/SearchBar'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios'
import { Alert, Avatar, Dialog, IconButton, Snackbar, TextField } from '@mui/material'
import { port } from '../../port'
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useSelector } from 'react-redux'
import girl1 from '../../Assets/girl1.png'
import { AddButton } from '../../Components/AddButton/AddButton'
export const DashBoard = () => {

  const [isSticky, setIsSticky] = useState(false);
  const [recipePostData, setRecipePostData] = useState();
  const [recipeFetchSuccess, setrecipeFetchSuccess] = useState(false);
  const [recipeFetchfailure, setrecipeFetchfailure] = useState(false);
  const [recipeFetchLoading, setrecipeFetchLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const {firstName, lastName, handle} = currentUser;
  const [addPostOpen, setAddPostOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (input) => {
    setSearchInput(input);
    
  };

  
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

  const handleSetAddPostOpen = (value) => {
    setAddPostOpen(value);
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
        const res = await axios.get(`/api/recipes/random`)
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

    const handleSearch = async() =>{
      try {
          const res = await axios.get(`/api/recipes/search?q=${searchInput}`)
          setRecipePostData(res.data)
      } catch (error) {
          console.log(error);
      }
    }

    
    useEffect(()=>{
      fetchData();
    }, [])
  return (
    <div>
      {/* navBar */}
      <AppNavBar addPostOpen={addPostOpen} setAddPostOpen={handleSetAddPostOpen} handleSearch={handleSearch} handleSearchInputChange={handleSearchInputChange}/>

      {/* other app content */}
      <div className="contentApp">
        {/* categories */}
        <Categories setRecipePosts={setRecipePostData}/>

        {/* searchBar */}
        <div className={`contentSearch ${isSticky? 'sticky' : ''}`}>
        <SearchBar onInputChange={handleSearchInputChange} onSearch={handleSearch}/>
        </div>

        <hr />

        {/* Recipe Posts */}
        <RecipePosts recipePostData={recipePostData} Fetchfailure={recipeFetchfailure} FetchSuccess={recipeFetchSuccess} fetchLoading={recipeFetchLoading} Dashboard={true}/>

        <div className="addButton" onClick={()=>{setAddPostOpen(true)}}>
            <AddOutlinedIcon style={{fontSize: '3rem', backgroundColor: '#EB5757', color: '#fff', borderRadius: '50%', padding: '0.3rem'}} />
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
