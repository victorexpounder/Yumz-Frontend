import { Alert, CircularProgress, Snackbar, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

export const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState();
  const [failure, setFailure] = useState();
  
  const handleSendLink = async() =>{
    try {
      setloading(true)
      const res = await axios.post('/api/users/sendresetlink', {
        email
      })
      setSuccess(res.data);
      setloading(false)
    } catch (error) {
      setloading(false);
      setFailure(error.response.data.message)
    }
  }
  return (
    <div className='loginCon'>
        <div className="content">
            <div className="headText">
                <h1>Don't Panic, Lets Recover Your Account</h1>
                <div className="other">
                  <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth type='email' onChange={(e)=> setEmail(e.target.value)}/>
                  
                  <div className="button" onClick={handleSendLink}>
                      {loading?
                        <CircularProgress size={25} sx={{color: '#fff'}}/> 
                        :
                        "Send Password Reset Link"
                      }
                  </div>
                </div>
            </div>
        </div>
      
        <Snackbar open={Boolean(success)} autoHideDuration={3000} onClose={()=> setSuccess(false)}>
          <Alert onClose={()=> setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>

        <Snackbar open={Boolean(failure)} autoHideDuration={3000} onClose={()=> setFailure(false)}>
          <Alert onClose={()=> setFailure(false)} severity="error" sx={{ width: '100%' }}>
            {failure}
          </Alert>
        </Snackbar>
        
    </div>
  )
}
