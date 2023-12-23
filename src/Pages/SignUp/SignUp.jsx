import React, { useState } from 'react'
import './SignUp.scss'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../Redux/userSlice';
import { port } from '../../port';

export const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [signUpSuccess, setSignUpSuccess] = useState();
  const [signUpFailure, setSignUpFailure] = useState();
  const [signUpLoading, setSignUpLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const createAccount = async() =>{
    if(firstName, lastName, email, password, confirmPassword)
    {
      if(confirmPassword === password)
      {
        try {
          setSignUpLoading(true)
          const res = await axios.post(`/api/auth/signup`, {
            firstName, lastName, email, password, handle : email
          });
          setSignUpSuccess(res.data);
  
          await axios.post('/api/auth/signin', {
            email, password
          });
          dispatch(loginSuccess(res.data));
          console.log(res.data);
          setSignUpLoading(false)
          navigate('/feed');
        } catch (error) {
          setSignUpFailure(error.response.data.message)
          setSignUpLoading(false)
        }
      }else{
        setSignUpFailure("Passwords Dismatch")
      }
    }else{
      setSignUpFailure("Enter all fields")
    }
  }

  return (
    <div className='SignupCon'>
        <div className="content">
            <div className="headText">
                <h1>Lets Get You Started</h1>
                <div className="other">
                <TextField id="outlined-basic" label="FirstName" variant="outlined" fullWidth onChange={(e)=> setFirstName(e.target.value)}/>
                <TextField id="outlined-basic" label="LastName" variant="outlined" fullWidth onChange={(e)=> setLastName(e.target.value)}/>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth onChange={(e)=> setEmail(e.target.value)} type='email'/>
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth hidden type='password' onChange={(e)=> setPassword(e.target.value)}/>
                <TextField id="outlined-basic" label="Comfirm Password" variant="outlined" fullWidth hidden type='password' onChange={(e)=> setConfirmPassword(e.target.value)}/>
                <div className="button" onClick={createAccount}>
                  {signUpLoading?
                        <CircularProgress size={25} sx={{color: '#fff'}}/>
                        :
                        "Continue"
                      }
                </div>
                <p>Already have an account? <a href="/login">Login</a></p>

                </div>
            </div>
        </div>

        <Snackbar open={signUpSuccess} autoHideDuration={2000} onClose={()=> setSignUpSuccess(false)}>
        <Alert onClose={()=> setSignUpSuccess(null)} severity="success" sx={{ width: '100%' }}>
         Account Created Succefully
        </Alert>
      </Snackbar>

      <Snackbar open={signUpFailure} autoHideDuration={6000} onClose={()=> setSignUpFailure(false)}>
        <Alert onClose={()=> setSignUpFailure(null)} severity="error" sx={{ width: '100%' }}>
          {signUpFailure}
        </Alert>
      </Snackbar>
    </div>
  )
}
