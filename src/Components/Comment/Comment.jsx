import Delete from '@mui/icons-material/Delete';
import { Avatar, IconButton } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { format } from 'timeago.js';
import { deletecom } from '../../Redux/commentSlice';
export const Comment = ({comment, play}) => {
    const [creator, setCreator] = useState();
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();


    const fetchCreator = async() =>{
        if(comment)
        {
          try {
            const res = await axios.get(`/api/users/find/${comment?.userId}`)
            setCreator(res.data)
          } catch (error) {
            console.log(error);
          }
    
        }
    }

    const deleteComment = async() =>{
        try {
            const res = await axios.delete(`/api/comments/${comment._id}`)
            console.log(res.data)
            dispatch(deletecom(comment._id))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
            fetchCreator()
    }, [comment])
  return (
    <div className={`comment ${!play? 'notplay' : ''}`}>
        <Link to={`/profile/find/${comment?.userId}`} style={{textDecoration: 'none', color: '#000'}}>
            <Avatar
            sx={{ bgcolor: '#EB5757', width: '35px', height: '35px', cursor: 'pointer'}}
            alt="Remy Sharp"
            src={creator?.img}
            className='avatar'
            >
            {creator?.firstName.charAt(0)}
            </Avatar>
        </Link>

        <div className="commentDetails">
            <div className="name">
                <div className="nameD">
                
                <h1>{creator?.handle? `@${creator?.handle}` : `${creator?.firstName} ${creator?.lastName}`}</h1>
                <p>{format(comment?.createdAt)}</p>
                
                </div>
                {comment.userId == currentUser._id &&
                    <div className="delete" >
                        <IconButton onClick={deleteComment}>
                            <Delete fontSize='small' sx={{color: "#EB5757"}}/>
                        </IconButton>
                    </div>
                }
            </div>

            <div className="commentDescription">
            <p>
                {comment.description}
            </p>
            </div>
        </div>
    </div>
  )
}
