import React, { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useSelector } from 'react-redux'
import girl1 from '../../Assets/girl1.png'
import { Avatar, Dialog, IconButton, TextField } from '@mui/material';
export const AddButton = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const {firstName, lastName, handle} = currentUser;
    const [addPostOpen, setAddPostOpen] = useState(false);
  return (
    <div className="addButton" onClick={()=> setAddPostOpen(true)}>
            <AddOutlinedIcon style={{fontSize: '2.5rem', backgroundColor: '#EB5757', color: '#fff', borderRadius: '50%', padding: '0.3rem'}} />
    </div>
  )
}
