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
import { useDispatch, useSelector } from 'react-redux';
import { port } from '../../port';
import { favorite } from '../../Redux/userSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { deleteObject, getStorage, ref } from 'firebase/storage';

export const RecipeCard = ({recipeData, isMine, isFavorites, isSide, dashboard}) => {

  const {title,imgUrl,likes, userId, createdAt, _id} = recipeData;
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [Creator, setcreator] = useState()
  const [comments, setComments] = useState()
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser);
  const {favorites} = currentUser;
  const dispatch = useDispatch();
  
  const fetchCreator = async() =>{
    const res = await axios.get(`/api/users/find/${userId}`)
    console.log(res.data)
    setcreator(res.data)
  }

  const checkFavorite = () =>{ 
    favorites.map((favorite)=>{
      if(favorite == _id)
      {
        setFavorited(true);
      }
    })
  }

  const addToFavorites = async() =>{
    try {
      if(currentUser.favorites.includes(_id))
      {
        const res = await axios.put(`/api/users/unfavorite/${_id}`)
        console.log(res.data);
      }else{
        const res = await axios.put(`/api/users/favorite/${_id}`)
        console.log(res.data)
      }
      dispatch(favorite(_id))
    } catch (error) {
      console.log(error)
    }

  }
  


  const fetchComments = async() =>{
    try {
        const res = await axios.get(`/api/comments/${_id}`);
        setComments(res.data);
    } catch (error) {
      console.log(error);
    }
}

  const deletePost = async(id) =>{
    
    try {
      const res = await axios.delete(`/api/recipes/post/${_id}`)
      const storage = getStorage();

      
      // Create a reference to the file
      const imgfileRef = ref(storage, `recipeFiles/${_id}img`);
      const videofileRef = ref(storage, `recipeFiles/${_id}video`);

      // Delete the file
      await deleteObject(videofileRef)
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
        });

      await deleteObject(imgfileRef)
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
        });
      
        console.log("deleted")
        setOpen(false);
        setDeleted(true);
        
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchCreator();
    checkFavorite();
    fetchComments();
  }, [recipeData])

  return (
    <div className="recipePost">
            {/* coverImg */}
            <Link to={`/recipeSingle/${_id}`}>
            <div className="coverImg" style={{backgroundImage: `url(${imgUrl})`}}>
            </div>
            </Link>
              {/* add to favorite button */}
              {!isMine && !dashboard?
              
              <div className="favButton">
                {currentUser.favorites.includes(_id)?   <FavoriteIcon onClick={addToFavorites} className='clickedColor'/>
                :
                  <FavoriteBorderIcon onClick={addToFavorites}/>
                }
              </div>

              :

              ''
              
              }

            {/* details */}
            <div className="recipeDetails">
              {/* Recipie name */}
              <div className="nameD">
                <Link to={`/recipeSingle/${_id}`} style={{textDecoration: 'none', color: '#000'}}>
                  <h1>{title}</h1>
                </Link>
                {isMine &&
                  <IconButton style={{padding: 2, color: '#EB5757'}} onClick={()=>setOpen(true)}>
                    <DeleteIcon fontSize='small'/>
                  </IconButton>
                }
                
              </div>
              {/* crator's avatar, name and post time */}
              <div className="creatorTime">
                {/* creators Avatar */}
                <Link to={userId === currentUser._id? '/profile' : `/profile/find/${userId}`} style={{textDecoration: 'none', color: '#000'}}>
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
              
              {!isSide &&
                <div className="figures">
                  <div className="likes"> 
                  <p> <strong>{likes.length}</strong> likes</p>
                  </div>
                  <div className="dot">
                    .
                  </div>
                  <div className="comments">
                    <p> <strong>{comments?.length}</strong> comments </p>
                  </div>
                </div>
              }

            </div>


        <Dialog
          open={Boolean(open)}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          Are You Sure You Want To Delete {title} {_id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Disagree</Button>
          <Button onClick={()=> deletePost(_id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

          <Snackbar open={deleted} autoHideDuration={7000} onClose={()=> setDeleted(false)} message="Recipe Deleted you might need to refresh to see changes" >
              
          </Snackbar>
          </div>
  )
}
