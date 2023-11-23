import React, { useEffect, useState } from 'react'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import Avatar from '@mui/material/Avatar';
import girl1 from '../../Assets/girl1.png'
import './Profile.scss'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts';
import { useDispatch, useSelector } from 'react-redux';
import { addHello, update, updateDescription } from '../../Redux/userSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
export const Profile = ({isMine}) => {
    console.log("rerendered")
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [editDescription, setEditDescription] = useState(false);
    const [selected, setSelected] = useState('posts');
    const [followed, setFollowed] = useState(false);
    const { userID } = useParams();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [profileDetails, setProfileDetails] = useState(currentUser)
    const {followers, following, firstName, lastName, handle, description} = profileDetails;
    const [descriptionedit, setDescriptionedit] = useState(description);
    const [recpies, setRecipes] = useState();
    const [favorites, setFavorites] = useState();
    const [loading, setLoading] = useState(false);
    const handleDescriptionUpdate = (e) =>{
        e.preventDefault();
        dispatch(updateDescription ({description}));
        setEditDescription(false);
    }

    const fetchUser = async() =>{
        if(!isMine)
        {
            try {
                const res = await axios.get(`/users/find/${userID}`);
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
                const res = await axios.get('recipes');
                setRecipes(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }else{
            try {
                setLoading(true)
                const res = await axios.get(`/recipes/findByUser/${userID}`);
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
                    const res = await axios.get(`/recipes/find/${favIds[i]}`);
                    tempFavorites.push(res.data);
                }
                console.log(tempFavorites)
                setFavorites(tempFavorites);
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        fetchUser();
        fetchRecipes();
        fetchFavorites();
    }, [isMine])
    

  return (
    <div>
        {/* navbar */}
        <div className="profileNavbar">
        <AppNavBar/>
        </div>

        <div className="profileContent">
            <div className="profileHeader"></div>

            <div className="profileAvatarCon">
            <Avatar
            sx={{ bgcolor: '#EB5757', height : '110px', width: '110px', fontSize: "48px"}}
            alt={firstName}
            >
                {firstName.charAt(0)} 
            </Avatar>
                
            </div>

            <div className="profiledetails">
                <div className="profiledetailsinner">
                    <div className="name"> {user.firstName} {lastName} </div>
                    <p className='handle'>@{handle}</p>
                    {!isMine &&
                    <div className="actionButtons">
                        <div className={` followButton ${followed? 'followed' : ''}`} onClick={()=> setFollowed(!followed)}> {followed? 'Following' : 'Follow'}</div>
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
                <div className="addButton">
                <AddOutlinedIcon style={{fontSize: '2.5rem', backgroundColor: '#EB5757', color: '#fff', borderRadius: '50%', padding: '0.3rem'}} />
                </div>
            }
        </div>
    </div>
  )
}
