import React from 'react'
import './SignUp.scss'
import TextField from '@mui/material/TextField';

export const SignUp = () => {
  return (
    <div className='SignupCon'>
        <div className="content">
            <div className="headText">
                <h1>Lets Get You Started</h1>
                <div className="other">
                <TextField id="outlined-basic" label="FullName" variant="outlined" fullWidth/>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth/>
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth hidden type='password' />
                <TextField id="outlined-basic" label="Comfirm Password" variant="outlined" fullWidth hidden type='password' />
                <div className="button">
                    Continue
                </div>
                <p>Already have an account? <a href="/login">Login</a></p>

                </div>
            </div>
        </div>
    </div>
  )
}
