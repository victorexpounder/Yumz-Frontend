import { createSlice} from '@reduxjs/toolkit'

export const userSlice =  createSlice({
    name: 'user',
    initialState : {
        firstName : 'Victor',
        lastName : 'Eze',
        email : 'victorexpounder@gmail.com',
        handle : 'victorcook',
        description: 'i am cook',
        followers : 30,
        following : 0,
    },
    reducers: {
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

export const {update, updateDescription} = userSlice.actions;
export default userSlice.reducer;