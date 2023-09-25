import { createSlice} from '@reduxjs/toolkit'

export const userSlice =  createSlice({
    name: 'user',
    initialState : {
        firstName : 'Victor',
        lastName : 'Eze',
        email : 'victorexpounder@gmail.com',
        handle : 'victorcook',
        description: '',
    },
    reducers: {
        update : (state, action) =>{
            state.firstName = action.payload.name
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.handle = action.payload.handle
            state.description = action.payload.description
        }
    }
})

export const {update} = userSlice.actions;
export default userSlice.reducer;