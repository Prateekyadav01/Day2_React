import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name:'movie',
    initialState:null,
    reducers:{
        addMovie:(state,action)=>{
            return action.payload;
        },
        removeMovie:(state,action)=>{
            return null;
        }
    }
});

export const {addMovie, removeMovie} = movieSlice.actions;

export default movieSlice.reducer;