import { CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'

export const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setloading] = useState();
  return (
    <div className='loginCon'>
        <div className="content">
            <div className="headText">
                <h1>Don't Panic, Lets Recover Your Account</h1>
                <div className="other">
                  <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth type='email' onChange={(e)=> setEmail(e.target.value)}/>
                  
                  <div className="button">
                      {loading?
                        <CircularProgress size={25} sx={{color: '#fff'}}/>
                        :
                        "Send Password Reset Link"
                      }
                  </div>
                </div>
            </div>
        </div>

        
    </div>
  )
}
