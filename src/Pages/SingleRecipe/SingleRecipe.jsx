import React, { useEffect, useState } from 'react'
import './SingleRecipe.scss'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from '@mui/material/Avatar';
import RecommendIcon from '@mui/icons-material/Recommend';
import CommentIcon from '@mui/icons-material/Comment';
import { Player, BigPlayButton } from 'video-react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { IconButton, Skeleton } from '@mui/material';
import axios from 'axios';
import { RecipeCard } from '../../Components/RecipeCard/RecipeCard';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import girl1 from '../../Assets/girl1.png'
import { favorite } from '../../Redux/userSlice';
import { format } from 'timeago.js';

export const SingleRecipe = () => {
    
   const data = {name: 'Nigerian Jollof Rice', image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Amanda Nnaji', avatar:"https://images.pexels.com/photos/14162172/pexels-photo-14162172.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: '2.5k', comments: 700, description: 'Delicious Nigerian jollof rice with bottom pot taste and well grilled chicken', video : 'https://vid.buzzfeed.com/output/83972/landscape_720/1520642061'}
   const [liked, setLiked] = useState();
   const [play, setPlay] = useState(false)
   const [recipeFetchLoading, setrecipeFetchLoading] = useState(false);
   const [sideRecipes, setSideRecipes] = useState();
   const [recipe, setRecipe] = useState();
   const [creator, setcreator] = useState();
   const [commentText, setCommentText] = useState();
   const [addPostOpen, setAddPostOpen] = useState(false);
   const {recipeID} = useParams();
   const dispatch = useDispatch();
   
   const currentUser = useSelector((state) => state.user.currentUser);
   const handleLike = () =>{
    setLiked(!liked);
  }

  const fetchSideRecipes = async() =>{
    try{
      
      const res = await axios.get(`/api/recipes/tags?categories=rice,nigerian`)
      console.log(res.data)
      setSideRecipes(res.data)
      
    }catch(err){
      
      console.log(err)
    }
  }

  const fetchRecipe = async() =>{
    try {
      setrecipeFetchLoading(true)
      const res = await axios.get(`/api/recipes/find/${recipeID}`)
      setRecipe(res.data)
      setrecipeFetchLoading(false)
    } catch (error) {
      setrecipeFetchLoading(false)
      console.log(error);
    }
  }

  const fetchCreator = async() =>{
    if(recipe)
    {
      try {
        const res = await axios.get(`/api/users/find/${recipe?.userId}`)
        setcreator(res.data)
      } catch (error) {
        console.log(error);
      }

    }
  }

  const handleSetAddPostOpen = (value) => {
    setAddPostOpen(value); 
  };

  const addToFavorites = async() =>{
    try {
      if(currentUser.favorites.includes(recipeID))
      {
        const res = await axios.put(`/api/users/unfavorite/${recipeID}`)
        console.log(res.data);
      }else{
        const res = await axios.put(`/api/users/favorite/${recipeID}`)
        console.log(res.data)
      }
      dispatch(favorite(recipeID))
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchRecipe();
  }, [])

  useEffect(()=>{
    fetchCreator();
    fetchSideRecipes();
  }, [recipe])

  return (
    <div className='singleRecipeCon'>
        <AppNavBar addPostOpen={addPostOpen} setAddPostOpen={handleSetAddPostOpen} className='navbar'/>
        <div className={`singleRecipeContainer ${play? 'flex' : ''}`}>
        <div className={`SRcontent ${play? 'desktopPlay' : ''}`}>
            <div className={`cover ${play? 'resize' : ''}`}>
                {!play?
                  <div className="coverImg" style={{backgroundImage: `url(${recipe?.imgUrl || "https://images.pexels.com/photos/4194842/pexels-photo-4194842.jpeg?auto=compress&cs=tinysrgb&w=800"})`}}>
                    <IconButton onClick={()=> setPlay(true)}>
                      <PlayCircleFilledIcon fontSize='large' sx={{color: '#ffff'}}/>
                    </IconButton>

                    <div className={`favButton ${currentUser.favorites.includes(recipeID)? 'favorite' : ''}`} onClick={addToFavorites}>
                    <FavoriteBorderIcon/>
                    </div>
                  </div>
                  :
                  <div className="videoContainer" >
                    <video controls  >
                        <source src={recipe?.videoUrl} type="video/mp4" />
                        <source src={recipe?.videoUrl} type="video/quicktime" />
                        Your browser does not support the video tag.
                    </video>
                  </div>

                }
                
            </div>

            <div className="details">
                {recipeFetchLoading?
                  <Skeleton variant="text" sx={{ fontSize: '40px', width: '50%'}} />
                  :
                  <h1> {recipe?.title} </h1>

                }

                <div className="creatorTime">
                  {/* creators Avatar */}
                  <Avatar
                    sx={{ bgcolor: '#EB5757', width: '30px', height: '30px', cursor: 'pointer'}}
                    alt="Remy Sharp"
                    src={creator?.img}
                    className='avatar'
                    >
                    {creator?.firstName.charAt(0)}
                  </Avatar>

                  {/* creators name */}
                  {recipeFetchLoading?
                    <Skeleton variant="text" sx={{ fontSize: '14px', width: '30%'}} />
                    :
                    <h8>{creator?.firstName} {creator?.lastName} </h8>
                  }

                  <strong>.</strong>

                  {/* time */}
                  <p>{format(recipe?.createdAt)}</p>
                </div>

               <p> {recipe?.description} </p>

              <div className="figures">
                <div className="likes">
                  <RecommendIcon onClick={handleLike} className={liked? 'likeButton' : ''}/>
                <p>{recipe?.likes.length}</p>
                </div>
                <div className="comments">
                  <CommentIcon/>
                  <p> {data.comments} </p>
                </div>
              </div>

                <div className="commentCon">
                  <div className={`commentInputCon ${!play? 'notplay' : ''}`}>
                      <Link to={'/profile'} style={{textDecoration: 'none', color: '#000'}}>
                        <Avatar
                          sx={{ bgcolor: '#EB5757', width: '35px', height: '35px', cursor: 'pointer'}}
                          alt="Remy Sharp"
                          src={girl1}
                          className='avatar'
                          >
                          {data.Creator.name.charAt(0)}
                        </Avatar>
                      </Link>
                      <div className={`commentInput`}>
                        <textarea 
                          placeholder='Add A Comment'
                          onChange={(e)=> setCommentText(e.target.value)}
                          style={{ resize: 'none' }}
                          rows={2}
                        />
                        <div className={`button ${commentText? 'active' : ''}`}>
                          Send
                        </div>
                      </div>
                  </div>

                  <div className="recipeComments">
                    <div className={`comment ${!play? 'notplay' : ''}`}>
                      <Link to={'/profile'} style={{textDecoration: 'none', color: '#000'}}>
                          <Avatar
                            sx={{ bgcolor: '#EB5757', width: '35px', height: '35px', cursor: 'pointer'}}
                            alt="Remy Sharp"
                            src="	https://images.pexels.com/photos/14162172/pexels-photo-14162172.jpeg?auto=compress&cs=tinysrgb&w=800"
                            className='avatar'
                            >
                            {data.Creator.name.charAt(0)}
                          </Avatar>
                        </Link>

                        <div className="commentDetails">
                          <div className="name">
                              <h1>@Jawnexplores</h1>
                              <p>4 days ago</p>
                          </div>

                          <div className="commentDescription">
                            <p>
                            Imagine being a fan of this chef in the fn Philippines and then getting into your regular Jeepney after work and finding yourself sitting next to the guy. Blessed
                            </p>
                          </div>
                        </div>
                    </div>
                    <div className={`comment ${!play? 'notplay' : ''}`}>
                      <Link to={'/profile'} style={{textDecoration: 'none', color: '#000'}}>
                          <Avatar
                            sx={{ bgcolor: '#EB5757', width: '35px', height: '35px', cursor: 'pointer'}}
                            alt="Remy Sharp"
                            src="	https://images.pexels.com/photos/14162172/pexels-photo-14162172.jpeg?auto=compress&cs=tinysrgb&w=800"
                            className='avatar'
                            >
                            {data.Creator.name.charAt(0)}
                          </Avatar>
                        </Link>

                        <div className="commentDetails">
                          <div className="name">
                              <h1>@Jawnexplores</h1>
                              <p>4 days ago</p>
                          </div>

                          <div className="commentDescription">
                            <p>
                            Imagine being a fan of this chef in the fn Philippines and then getting into your regular Jeepney after work and finding yourself sitting next to the guy. Blessed
                            </p>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>

            </div>
        </div>
        {play &&
          <div className="side">
              {sideRecipes.map((recipe)=>(
                  <RecipeCard recipeData={recipe} isSide={true}/>
              ))

              }
          </div>
        }
        </div>
    </div>
  )
}
