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

        favorite : (state, action) =>{
            if(state.currentUser.favorites.includes(action.payload))
            {
                state.currentUser.favorites.splice(
                    state.currentUser.favorites.findIndex(
                        (recipeId) => recipeId === action.payload
                    ),
                    1
                )
            }else{
                state.currentUser.favorites.push(action.payload)
            }
        },

        follow: (state, action) =>{
            if(state.currentUser.following.includes(action.payload))
            {
                state.currentUser.following.splice(
                    state.currentUser.following.findIndex(
                        (id) => id === action.payload
                    ),
                    1
                )
            }else{
                state.currentUser.following.push(action.payload);
            }
        },

        updateDescription: (state, action) =>{
            state.currentUser.description = action.payload
        },

        updateHandle: (state, action) =>{
            state.currentUser.handle = action.payload
        },
        
    }
})

export const {update, updateDescription, updateHandle, loginLoading, loginSuccess, loginFailure, logout, favorite, follow} = userSlice.actions;
export default userSlice.reducer;