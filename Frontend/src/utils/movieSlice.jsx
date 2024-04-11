import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name:'movie',
    initialState:{
        nowPlayingMovies:null,
    },
    reducers:{
        addMovie:(state,action)=>{
           state.nowPlayingMovies = action.payload;
        },
        removeMovie:(state,action)=>{
            return null;
        }
    }
});

export const {addMovie, removeMovie} = movieSlice.actions;

export default movieSlice.reducer;


// 1kg tagar or 250gm khooyyaa