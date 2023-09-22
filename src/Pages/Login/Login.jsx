import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import './Login.scss'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='loginCon'>
        <div className="content">
            <div className="headText">
                <h1>Welcome back</h1>
                <div className="other">
                <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth type='email'/>
                <FormControl sx={{ m: 1}} variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={()=> setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword? <VisibilityIcon onclick={()=> setShowPassword(!showPassword)}/> : <VisibilityOffIcon onclick={()=> setShowPassword(!showPassword)}/>}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                
                <div className="button">
                    Continue
                </div>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>

                </div>
            </div>
        </div>
    </div>
  )
}
