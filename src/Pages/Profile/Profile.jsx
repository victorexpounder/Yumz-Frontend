import React, { useEffect, useRef, useState } from 'react'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import Avatar from '@mui/material/Avatar';
import girl1 from '../../Assets/girl1.png'
import './Profile.scss'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts';
import { useDispatch, useSelector } from 'react-redux';
import { addHello, follow, update, updateDescription, updateHandle } from '../../Redux/userSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Dialog, IconButton, TextField } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { port } from '../../port';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
export const Profile = ({isMine}) => {
    console.log("rerendered")
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [editDescription, setEditDescription] = useState(false);
    const [editHandle, setEditHandle] = useState(false);
    const [selected, setSelected] = useState('posts');
    const [followed, setFollowed] = useState(false);
    const { userID } = useParams();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [profileDetails, setProfileDetails] = useState(currentUser)
    const {followers, following, firstName, lastName, handle, description, _id,} = profileDetails;
    const [descriptionedit, setDescriptionedit] = useState(description);
    const [handleEdit, setHandleEdit] = useState(handle);
    const [recpies, setRecipes] = useState();
    const [favorites, setFavorites] = useState();
    const [loading, setLoading] = useState(false);
    const [addPostOpen, setAddPostOpen] = useState(false);
    const avatarInputRef = useRef(null)
    const coverInputRef = useRef(null)

    const handleAvatarClick = () => {
        // Trigger the file input programmatically
        if (avatarInputRef.current) {
          avatarInputRef.current.click();
        }
    };
    const handleCoverClick = () => {
        // Trigger the file input programmatically
        if (coverInputRef.current) {
          coverInputRef.current.click();
        }
    };

    const handleDescriptionUpdate = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.put(`/api/users/${_id}`, {
                description : descriptionedit
            })
            dispatch(updateDescription (descriptionedit));
            
        } catch (error) {
            console.log(error);
        }
        setEditDescription(false);
    }
    const handleChangeHandle = async(e) =>{
        e.preventDefault();
        try {
            const checkres = await axios.get(`/api/users/handle/${handleEdit}`)
            const handle = checkres.data;
            const res = await axios.put(`/api/users/${_id}`, {
                handle : handle
            })
            dispatch(updateHandle(handle)); 
        } catch (error) {
            alert(error.response.data.message);
        }
        setEditHandle(false);
    }

    const fetchUser = async() =>{
        if(!isMine)
        {
            try {
                const res = await axios.get(`/api/users/find/${userID}`);
                setProfileDetails(res.data);
            } catch (error) {
                console.log(error);
                
            }
        }else{
            setProfileDetails(currentUser);
        }
    }

    const fetchRecipes = async()=>{
        if(isMine)
        {
            try {
                setLoading(true)
                const res = await axios.get(`/api/recipes`);
                setRecipes(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }else{
            try {
                setLoading(true)
                const res = await axios.get(`/api/recipes/findByUser/${userID}`);
                setRecipes(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    const fetchFavorites = async() =>{
        if(isMine)
        {
            try {
                let tempFavorites = [];
                const favIds = currentUser.favorites;
                console.log(favIds)
                for(let i = 0; i < favIds.length; i++)
                {
                    const res = await axios.get(`/api/recipes/find/${favIds[i]}`);
                    tempFavorites.push(res.data);
                }
                console.log(tempFavorites)
                setFavorites(tempFavorites);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleFollow = async() =>{
        try {
            if(currentUser.following.includes(userID))
            {
                const res = await axios.put(`/api/users/unfollow/${userID}`)

            }else{
                const res = await axios.put(`/api/users/follow/${userID}`)
            }
            dispatch(follow(userID))
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(()=>{
        fetchUser();
        fetchRecipes();
        fetchFavorites();
    }, [isMine])
    
    const handleSetAddPostOpen = (value) => {
        setAddPostOpen(value);
      };

      const handleAvatarChange = () =>{
        
      }

  return (
    <div>
        {/* navbar */}
        <div className="profileNavbar">
        <AppNavBar addPostOpen={addPostOpen} setAddPostOpen={handleSetAddPostOpen}/>
        </div>

        <div className="profileContent">
            <input 
                type="file" 
                accept="image/*"
                style={{display: 'none'}}
                ref={avatarInputRef}
            />
            <input 
                type="file" 
                accept="image/*"
                style={{display: 'none'}}
                ref={coverInputRef}
            />
            
            <div className="profileHeader" onClick={handleCoverClick}></div>

            <div className="profileAvatarCon" onClick={handleAvatarClick}>
            <Avatar
            sx={{ bgcolor: '#EB5757', height : '110px', width: '110px', fontSize: "48px"}}
            alt={firstName}
            >
                {firstName.charAt(0)} 
            </Avatar>
                
            </div>

            <div className="profiledetails">
                <div className="profiledetailsinner">
                    <div className="name"> {firstName} {lastName} </div>
                    {editHandle && isMine==true?
                        <textarea type="text" placeholder='Add a handle'  autoFocus value={handleEdit} onBlur={handleChangeHandle} onChange={(event)=>{setHandleEdit(event.target.value.toLowerCase())}} rows={1} spellCheck/>
                        :
                        <p className='handle' onClick={()=> setEditHandle(true)} >@{handle}</p>

                    }
                    {!isMine &&
                    <div className="actionButtons">
                        <div className={` followButton ${currentUser.following.includes(userID)? 'followed' : ''}`} onClick={handleFollow}> {currentUser.following.includes(userID)? 'Following' : 'Follow'}</div>
                        <div className="moreButton">. . .</div>
                    </div>
                    }

                    <div className="description">
                        {editDescription && isMine===true?
                        (
                            <textarea type="text" placeholder='Add a description' onBlur={handleDescriptionUpdate} autoFocus value={descriptionedit} onChange={(event)=>{setDescriptionedit(event.target.value)}} rows={1} spellCheck/>
                        )
                        :
                        (
                            description?.length > 0 || isMine? 
                            <p onClick={()=>{setEditDescription(true)}} className={`${description?.length > 0? 'descP' : 'gray'}`}> {description?.length > 0? description : 'Add a description'} </p>
                            :
                            ''
                        )
                        }
                    </div>

                    <div className="stats">
                        <div className="followers"> <span>{followers}</span> folloewrs</div>
                        <div className="following"> <span>{following?.length}</span>  following</div>
                    </div>
                </div>
                <div className="postSections">
                <div className="postsHeader">
                    <div className={`posts ${selected === 'posts'? 'selected' : ''}`} onClick={()=>setSelected('posts')}> Posts </div>
                    {isMine &&
                    <div className={`favorites ${selected === 'favorite'? 'selected' : ''}`} onClick={()=>setSelected('favorite')}> Favorites  </div>
                    }
                </div>

                <div className="postsContainer">
                    {selected === 'posts'? 
                    
                    <RecipePosts isMine={true} recipePostData={recpies} fetchLoading={loading}/>

                    :

                    <RecipePosts isMine={false} recipePostData={favorites}/>
                
                    }
                </div>
                </div>
            </div>

            {isMine &&
                <div className="addButton" onClick={()=> setAddPostOpen(true)}>
                <AddOutlinedIcon style={{fontSize: '2.5rem', backgroundColor: '#EB5757', color: '#fff', borderRadius: '50%', padding: '0.3rem'}} />
                </div>
            }
        </div>

        
    </div>
  )
}
