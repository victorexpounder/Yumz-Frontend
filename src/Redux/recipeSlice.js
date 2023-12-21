import { combineReducers, createSlice} from '@reduxjs/toolkit'

    const initialState =  {
        recipe : null,
        loading : false,
        error : false,
        
    }

    

export const recipeSlice =  createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        fetchLoading : (state) =>{
            state.loading = true
        },

        fetchSuccess : (state, action) =>{
            state.loading = false;
            state.recipe = action.payload
        },

        like : (state, action) =>{
            if(state.recipe.likes.includes(action.payload))
            {
                state.recipe.likes.splice(
                    state.recipe.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                )
            }else{
                state.recipe.likes.push(action.payload);
            }
        },

        
        
    }
})

export const {fetchLoading, fetchSuccess, like} = recipeSlice.actions;
export default recipeSlice.reducer;