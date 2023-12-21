import { Alert, CircularProgress, Snackbar, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState();
  const [failure, setFailure] = useState();
  const { token } = useParams();

  const handleReset = async() =>{
    try {
      console.log(token);
      setloading(true)
      const res = await axios.post('/api/users/resetlink', {
        token, newPassword : password
      })
      setSuccess(res.data);
      setloading(false)
      
    } catch (error) {
      setloading(false);
      setFailure(error.response.data.message)
      console.log(error);
    }
  }

  return (
    <div className='loginCon'>
        <div className="content">
            <div className="headText">
                <h1>Enter New Password</h1>
                <div className="other">
                  <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth  onChange={(e)=> setPassword(e.target.value)}/>
                  
                  <div className="button" onClick={handleReset}>
                      {loading?
                        <CircularProgress size={25} sx={{color: '#fff'}}/>
                        :
                        "Reset Password"
                      }
                  </div>
                </div>
            </div>
        </div>

        <Snackbar open={Boolean(success)} autoHideDuration={3000} onClose={()=> setSuccess(false)}>
          <Alert onClose={()=> setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            {`${success} return to login`}
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
