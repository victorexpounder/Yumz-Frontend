import React, { useState } from 'react'
import { AppNavBar } from '../../Components/AppNavBar/AppNavBar'
import Avatar from '@mui/material/Avatar';
import girl1 from '../../Assets/girl1.png'
import './Profile.scss'
import { RecipePosts } from '../../Components/RecipePosts/RecipePosts';
import { useDispatch, useSelector } from 'react-redux';
import { addHello, update, updateDescription } from '../../Redux/userSlice';
export const Profile = ({isMine}) => {

    console.log("rerendered")

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const {followers, following} = user;
    const [firstName, setFirstname] = useState(user.firstName);
    const [lastName, setLastname] = useState(user.lastName);
    const [handle, setHandle] = useState(user.handle);
    const [description, setdescription] = useState(user.description);
    const [editDescription, setEditDescription] = useState(false);
    const [selected, setSelected] = useState('posts');
    const [followed, setFollowed] = useState(false);

    const handleDescriptionUpdate = (e) =>{
        e.preventDefault();
        dispatch(updateDescription ({description}));
        setEditDescription(false);
    }

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
                            <textarea type="text" placeholder='Add a description' onBlur={handleDescriptionUpdate} autoFocus value={description} onChange={(event)=>{setdescription(event.target.value)}} rows={1} spellCheck/>
                        )
                        :
                        (
                            description.length > 0 || isMine? 
                            <p onClick={()=>{setEditDescription(true)}} className={`${description.length > 0? 'descP' : 'gray'}`}> {user.description.length > 0? user.description : 'Add a description'} </p>
                            :
                            ''
                        )
                        }
                    </div>

                    <div className="stats">
                        <div className="followers"> <span>{followers}</span> folloewrs</div>
                        <div className="following"> <span>{following}</span>  following</div>
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
                    
                    <RecipePosts isMine={true}/>

                    :

                    <RecipePosts isMine={false}/>
                
                    }
                </div>
                </div>
            </div>

        </div>
    </div>
  )
}
