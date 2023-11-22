import { combineReducers, createSlice} from '@reduxjs/toolkit'


    const initialState =  {
        currentUser : null,
        loading : false,
        error : false,
        firstName : 'Victor',
        lastName : 'Eze',
        email : 'victorexpounder@gmail.com',
        handle : 'victorcook',
        description: 'i am cook',
        followers : 30,
        following : 0,
    }

    

export const userSlice =  createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginLoading : (state) =>{
            state.loading = true
        },

        loginSuccess : (state, action) =>{
            state.loading = false;
            state.currentUser = action.payload
        },

        loginFailure : (state) =>{
            state.loading = false
            state.error = true
        },
        logout : (state) =>{
            return initialState;
        },

        update : (state, action) =>{
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.handle = action.payload.handle
            state.description = action.payload.description
        },
        updateDescription: (state, action) =>{
            state.description = action.payload.description
        },
        
    }
})

export const {update, updateDescription, loginLoading, loginSuccess, loginFailure, logout} = userSlice.actions;
export default userSlice.reducer;