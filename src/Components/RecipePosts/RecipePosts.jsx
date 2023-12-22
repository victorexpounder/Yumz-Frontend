import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './RecipePosts.scss'
import axios, { Axios } from 'axios'
import { RecipeCard } from '../RecipeCard/RecipeCard';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Skeleton } from '@mui/material';
import notFound from '../../Assets/notFound.svg'
import create from '../../Assets/create.svg'
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const RecipePosts = ({isFavorites, isMine, recipePostData, fetchLoading, Dashboard}) => {
    
  return (
    <div className='recipePostsContainer'>
      {(!recipePostData || recipePostData?.length == 0) && !fetchLoading &&
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center'}}
          >
          <div>
          <img src={(recipePostData?.length == 0) && isMine ? create : notFound} alt="" />
          <h1 style={{fontFamily: 'Poppins', textAlign: 'center'}}>
            {(recipePostData?.length == 0) && isMine ?
             "Create Your First Recipe"
             : 
             "No Recipes Found"
            }
            </h1>
          </div>
          </div>
      }
      <div className="recipePostsContent"> 
        {recipePostData?
          recipePostData.map((recipe, index)=>{
            return(
              <RecipeCard recipeData={recipe} isMine={isMine} isFavorites={isFavorites} key={recipe._id} dashboard={Dashboard}/>
            )
          })
          :
            fetchLoading?
            (new Array(3).fill(0)).map((item, index)=>(
              <div style={{marginBottom: '24px'}}>
              <Skeleton variant="rounded"  height={148} /> 
              <Skeleton variant="text" sx={{ fontSize: '30px', width: '100%'}} />
              <div style={{display: 'flex', gap: '5px'}}>
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" sx={{ fontSize: '14px', width: '100%'}} />
              </div>
              <Skeleton variant="text" sx={{ fontSize: '30px', width: '30%'}} />
              </div>
            ))
            :
            ''
        }
      </div>
      
    </div>
  )
}
