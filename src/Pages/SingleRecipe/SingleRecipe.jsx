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
import { fetchSuccess, like } from '../../Redux/recipeSlice';
import { Comment } from '../../Components/Comment/Comment';
import { add, fetchCommentsSuccess } from '../../Redux/commentSlice';
import commentimg from '../../Assets/comment.svg'
import ShareIcon from '@mui/icons-material/Share';

export const SingleRecipe = () => {
    
   const data = {name: 'Nigerian Jollof Rice', image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800", Creator: {name:'Amanda Nnaji', avatar:"https://images.pexels.com/photos/14162172/pexels-photo-14162172.jpeg?auto=compress&cs=tinysrgb&w=800"}, likes: '2.5k', comments: 700, description: 'Delicious Nigerian jollof rice with bottom pot taste and well grilled chicken', video : 'https://vid.buzzfeed.com/output/83972/landscape_720/1520642061'}
   const [liked, setLiked] = useState();
   const [play, setPlay] = useState(false)
   const [recipeFetchLoading, setrecipeFetchLoading] = useState(false);
   const [sideRecipes, setSideRecipes] = useState();
   const [creator, setcreator] = useState();
   const [commentText, setCommentText] = useState();
   const [addPostOpen, setAddPostOpen] = useState(false);
   const {recipeID} = useParams();
   const dispatch = useDispatch();
   const currentUser = useSelector((state) => state.user.currentUser);
   const recipe = useSelector((state) => state.recipe.recipe)
   const comments = useSelector((state) => state.comments.comments)
   

  const fetchSideRecipes = async() =>{
    try{
      
      const res = await axios.get(`/api/recipes/tags?categories=${recipe?.title.replace(/ /g, ",").toLowerCase()}`)
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
      dispatch(fetchSuccess(res.data))
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

  const handleLike = async() =>{
    try {
      if(recipe.likes.includes(currentUser._id))
      {
        const res = await axios.put(`/api/users/unlike/${recipe._id}`)
        console.log(res.data);
        dispatch(like(currentUser._id))
      }else{
        const res = await axios.put(`/api/users/like/${recipe._id}`)
        console.log(res.data);
        dispatch(like(currentUser._id))
      }
    } catch (error) {
      console.log(error)
    }
  }


  const fetchComments = async() =>{
      try {
          const res = await axios.get(`/api/comments/${recipeID}`);
          dispatch(fetchCommentsSuccess(res.data))
      } catch (error) {
        console.log(error);
      }
  }

  const addComment = async() =>{
    if(commentText)
    {
      try {
        const res = await axios.post(`/api/comments`, {
          recipeId: recipe._id, description : commentText
        });
        dispatch(add(res.data))
        
      } catch (error) {
        console.log(error)
      }

    }
  }

  const copyToClipboard = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert('URL copied to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
      });
  };

  useEffect(()=>{
    fetchRecipe();
  }, [])

  useEffect(()=>{
    fetchCreator();
    fetchSideRecipes();
    fetchComments();
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
                  <Link to={recipe?.userId == currentUser._id? '/profile' : `/profile/find/${recipe?.userId}`} style={{textDecoration: 'none', }}>
                    <Avatar
                      sx={{ bgcolor: '#EB5757', width: '30px', height: '30px', cursor: 'pointer'}}
                      alt="Remy Sharp"
                      src={creator?.img}
                      className='avatar'
                      >
                      {creator?.firstName.charAt(0)}
                    </Avatar>
                  </Link>

                  {/* creators name */}
                  {recipeFetchLoading?
                    <Skeleton variant="text" sx={{ fontSize: '14px', width: '30%'}} />
                    :
                    <Link to={recipe?.userId == currentUser._id? '/profile' : `/profile/find/${recipe?.userId}`} style={{textDecoration: 'none', color: 'inherit'}}>
                      <h8>{creator?.firstName} {creator?.lastName} </h8>
                    </Link>
                  }
                  <strong>.</strong>

                  {/* time */}
                  <p>{format(recipe?.createdAt)}</p>
                </div>

               <p> {recipe?.description} </p>

              <div className="figures">
                <div className="likes">
                  <RecommendIcon onClick={handleLike} className={recipe?.likes.includes(currentUser._id)? 'likeButton' : ''}/>
                <p>{recipe?.likes.length}</p>
                </div>
                <div className="comments">
                  <CommentIcon/>
                  <p> {comments?.length} </p>
                </div>
                <div className="comments" onClick={copyToClipboard}>
                  <ShareIcon/>
                </div>
              </div>

                <div className="commentCon">
                  <div className={`commentInputCon ${!play? 'notplay' : ''}`}>
                      <Link to={'/profile'} style={{textDecoration: 'none', color: '#000'}}>
                        <Avatar
                          sx={{ bgcolor: '#EB5757', width: '35px', height: '35px', cursor: 'pointer'}}
                          alt="Remy Sharp"
                          src={currentUser.img}
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
                        <div className={`button ${commentText? 'active' : ''}`} onClick={addComment}>
                          Send
                        </div>
                      </div>
                  </div>

                  <div className="recipeComments">
                    {comments?.length == 0 &&
                      <div className="noComment" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <img src={commentimg} alt="" width={'50%'} height={'50%'}/>
                        <p>Be the first to comment</p>

                      </div>
                    }

                    {comments?.map((comment)=>(
                        <Comment comment={comment} play={play} id={comment._id}/>
                    ))}
                    
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
