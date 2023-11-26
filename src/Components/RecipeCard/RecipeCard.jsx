import React, { useEffect, useState } from 'react'
import './RecipeCard.scss'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecommendIcon from '@mui/icons-material/Recommend';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import {format} from 'timeago.js'
import { useSelector } from 'react-redux';
import { port } from '../../port';
export const RecipeCard = ({recipeData, isMine, isFavorites}) => {

  const {title,imgUrl,likes, userId, createdAt} = recipeData;
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [Creator, setcreator] = useState()
  const currentUser = useSelector((state) => state.user.currentUser);

  const fetchCreator = async() =>{
    const res = await axios.get(`/api/users/find/${userId}`)
    console.log(res.data)
    setcreator(res.data)
  }

  
  useEffect(()=>{
    fetchCreator();
  }, [recipeData])

  return (
    <div className="recipePost">
            {/* coverImg */}
            <Link to={'/recipeSingle'}>
            <div className="coverImg" style={{backgroundImage: `url(${imgUrl})`}}>
            </div>
            </Link>
              {/* add to favorite button */}
              {!isMine?
              
              <div className="favButton">
                {favorited?   <FavoriteIcon onClick={()=> setFavorited(!favorited)} className='clickedColor'/>
                :
                  <FavoriteBorderIcon onClick={()=> setFavorited(!favorited)}/>
                }
              </div>

              :

              ''
              
              }

            {/* details */}
            <div className="recipeDetails">
              {/* Recipie name */}
              <div className="nameD">
                <Link to={'/recipeSingle'} style={{textDecoration: 'none', color: '#000'}}>
                  <h1>{title}</h1>
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
                <Link to={userId == currentUser._id? '/profile' : `/profile/find/${userId}`} style={{textDecoration: 'none', color: '#000'}}>
                  <Avatar
                    sx={{ bgcolor: '#EB5757', width: '30px', height: '30px', cursor: 'pointer'}}
                    alt="Remy Sharp"
                    src={Creator?.img}
                    >
                    {Creator?.firstName.charAt(0)}
                  </Avatar>
                </Link>

                {/* creators name */}
                <Link to={userId == currentUser._id? '/profile' : `/profile/find/${userId}`} style={{textDecoration: 'none', color: '#000'}}>

                <h8>{Creator?.firstName} {Creator?.lastName} </h8>
                </Link>

                <strong>.</strong>

                {/* time */}
                <p>{format(createdAt)}</p>
              </div>

              <div className="figures">
                <div className="likes"> 
                  <RecommendIcon onClick={() => setLiked(!liked)} className={liked? 'likeButton' : ''}/>
                <p>{likes.length}</p>
                </div>
                <div className="comments">
                  <CommentIcon/>
                  <p> 236 </p>
                </div>
              </div>
            </div>
          </div>
  )
}
