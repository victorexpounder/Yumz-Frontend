import React, { useState } from 'react'
import './SingleRecipe.scss'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from '@mui/material/Avatar';
import RecommendIcon from '@mui/icons-material/Recommend';
import CommentIcon from '@mui/icons-material/Comment';

export const SingleRecipe = () => {
    
   const data = {name: 'Nigerian Jollof Rice', image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Amanda Nnaji', avatar:"https://images.pexels.com/photos/14162172/pexels-photo-14162172.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: '2.5k', comments: 700, description: 'Delicious Nigerian jollof rice with bottom pot taste and well grilled chicken'}
   const [liked, setLiked] = useState();
   const handleLike = () =>{
    setLiked(!liked);
  }

  return (
    <div className='singleRecipeCon'>
        <AppNavBar/>
        <div className="SRcontent">
            <div className="cover">
                <div className="coverImg" style={{backgroundImage: `url(${data.image})`}}></div>
                <div className="favButton">
                    <FavoriteBorderIcon/>
                </div>
            </div>
            <div className="details">
                <h1> {data.name} </h1>

                <div className="creatorTime">
                {/* creators Avatar */}
                <Avatar
                  sx={{ bgcolor: '#EB5757', width: '30px', height: '30px', cursor: 'pointer'}}
                  alt="Remy Sharp"
                  src={data.Creator.avatar}
                  className='avatar'
                  >
                  {data.Creator.name.charAt(0)}
                </Avatar>

                {/* creators name */}
                <h8>{data.Creator.name} </h8>

                <strong>.</strong>

                {/* time */}
                <p>10min</p>
              </div>

               <p> {data.description} </p>

              <div className="figures">
                <div className="likes">
                  <RecommendIcon onClick={handleLike} className={liked? 'likeButton' : ''}/>
                <p>{data.likes}</p>
                </div>
                <div className="comments">
                  <CommentIcon/>
                  <p> {data.comments} </p>
                </div>
              </div>

            </div>
        </div>
    </div>
  )
}
