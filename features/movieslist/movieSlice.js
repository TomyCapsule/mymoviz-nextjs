import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
    name:'movieInfo',
    initialState:{
        value: {}
    },
    reducers:{
        initMovieInfo:(state,action)=>{
            console.log('actionFromMovieSlice:',action);
            state.value = {...action.payload};
        }
    }
})

export const {initMovieInfo} = movieSlice.actions;
export default movieSlice.reducer;