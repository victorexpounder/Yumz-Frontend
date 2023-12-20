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
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginLoading, loginSuccess } from '../../Redux/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar } from '@mui/material';
import { port } from '../../port';
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const navigate = useNavigate();
  const handleSignIn = async(e) =>{
    e.preventDefault();
    if (email && password)
    {
      try {
        dispatch(loginLoading());
        const res = await axios.post(`/api/auth/signin`, {
          email, password
        })
        dispatch(loginSuccess(res.data));
        console.log(res.data);
        navigate('/feed');
      } catch (error) {
        dispatch(loginFailure())
        setError(error.response.data.message)
        console.log(error.response.data)
      }
    }else{
      setError("Email or password cannot be empty")
    }
  }
  return (
    <div className='loginCon'>
        <div className="content">
            <div className="headText">
                <h1>Welcome back</h1>
                <div className="other">
                <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth type='email' onChange={(e)=> setEmail(e.target.value)}/>
                <FormControl sx={{ m: 1}} variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e)=> setPassword(e.target.value)}
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
                
                <div className="button" onClick={handleSignIn}>
                    {loading?
                      <CircularProgress size={25} sx={{color: '#fff'}}/>
                      :
                      "Continue"
                    }
                </div>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                <p><a href="/forgot-password">forgot password?</a> </p>
                </div>
            </div>
        </div>

        <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={()=> setError(false)}>
        <Alert onClose={()=> setError(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
