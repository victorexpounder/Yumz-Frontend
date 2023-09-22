import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './RecipePosts.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecommendIcon from '@mui/icons-material/Recommend';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, Navigate } from 'react-router-dom';

export const RecipePosts = ({isFavorites, isMine}) => {
    const recipePostData = [
        {name: 'Burger And Chips', image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Allison Smith', avatar:"https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: '2.5k', comments: 700},
        {name: 'Nigerian Jollof', image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Amanda Nnaji', avatar:"https://images.pexels.com/photos/14162172/pexels-photo-14162172.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: '1.3k', comments: 300},
        {name: 'Potatoe Sauce And Cream', image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Leila Montes', avatar:"https://images.pexels.com/photos/3387577/pexels-photo-3387577.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: 500, comments: 700},
        {name: 'Honey Pancakes', image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Alexandra Campbell', avatar:"https://images.pexels.com/photos/1028927/pexels-photo-1028927.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: 500, comments: 700},
        {name: 'Japanese Sauce', image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Jennifer Louis', avatar:"https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: 500, comments: 700},
        {name: 'Japanese Sauce', image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Jennifer Louis', avatar:"https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: 500, comments: 700},
        {name: 'Japanese Sauce', image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Jennifer Louis', avatar:"https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: 500, comments: 700},
        {name: 'Japanese Sauce', image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Jennifer Louis', avatar:"https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: 500, comments: 700},
        {name: 'Japanese Sauce', image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Jennifer Louis', avatar:"https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: 500, comments: 700},
        
    ]
    const [liked, setLiked] = useState(Array(recipePostData.length));
    const [favorites, setFavorites] = useState(Array(recipePostData.length));

    const handleLike = (index) =>{
      const likeArray = [...liked];
      likeArray[index] = !likeArray[index]
      setLiked(likeArray);
    }
    const handleFavourite = (index) =>{
      const favoriteArray = [...favorites];
      favoriteArray[index] = !favoriteArray[index];
      setFavorites(favoriteArray);
    }
  return (
    <div className='recipePostsContainer'>
      <div className="recipePostsContent">
        {recipePostData.map(({name,image,Creator, likes, comments}, index)=>{
          return(
          <div className="recipePost"  >
            {/* coverImg */}
            <Link to={'/recipe Single'}>
            <div className="coverImg" style={{backgroundImage: `url(${image})`}}>
            </div>
            </Link>
              {/* add to favorite button */}
              {!isMine?
              
              <div className="favButton">
                {favorites[index]?   <FavoriteIcon onClick={()=> handleFavourite(index)} className='clickedColor'/>
                :
                  <FavoriteBorderIcon onClick={()=> handleFavourite(index)}/>
                }
              </div>

              :

              ''
              
              }

            {/* details */}
            <div className="recipeDetails">
              {/* Recipie name */}
              <div className="nameD">
                <Link to={'/recipe Single'} style={{textDecoration: 'none', color: '#000'}}>
                  <h1>{name}</h1>
                </Link>
              {isFavorites?
              <DeleteIcon sx={{cursor: 'pointer', color: '#EB5757'}}/>
              :
              ''
              }
              </div>
              {/* crator's avatar, name and post time */}
              <div className="creatorTime">
                {/* creators Avatar */}
                <Link to={'/profile'} style={{textDecoration: 'none', color: '#000'}}>
                  <Avatar
                    sx={{ bgcolor: '#EB5757', width: '30px', height: '30px', cursor: 'pointer'}}
                    alt="Remy Sharp"
                    src={Creator.avatar}
                    >
                    {Creator.name.charAt(0)}
                  </Avatar>
                </Link>

                {/* creators name */}
                <Link to={'/profile'} style={{textDecoration: 'none', color: '#000'}}>

                <h8>{Creator.name} </h8>
                </Link>

                <strong>.</strong>

                {/* time */}
                <p>10min</p>
              </div>

              <div className="figures">
                <div className="likes">
                  <RecommendIcon onClick={() => handleLike(index)} className={liked[index]? 'likeButton' : ''}/>
                <p>{likes}</p>
                </div>
                <div className="comments">
                  <CommentIcon/>
                  <p> {comments} </p>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
      
    </div>
  )
}
