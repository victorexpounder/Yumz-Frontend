import { combineReducers, createSlice} from '@reduxjs/toolkit'

    const initialState =  {
        comments : null,
        loading : false,
        error : false,
        
    }

    

export const commentSlice =  createSlice({
    name: 'comments',
    initialState,
    reducers: {
        fetchCommentsLoading : (state) =>{
            state.loading = true
        },

        fetchCommentsSuccess : (state, action) =>{
            state.loading = false;
            state.comments = action.payload
        },

        add : (state, action) =>{
            state.comments.unshift(action.payload);
        },

        deletecom : (state, action) =>{
            state.comments.splice(
                    state.comments.findIndex(
                        (comment) => comment._id === action.payload
                    ),
                    1
            )
        },

        
        
    }
})

export const {fetchCommentsLoading, fetchCommentsSuccess, add, deletecom} = commentSlice.actions;
export default commentSlice.reducer;