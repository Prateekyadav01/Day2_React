import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        nowPlayingMovies: null,
        trailerMovie:null,
    },
    reducers: {
        addMovie: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailer: (state, action) => {
            state.trailerMovie = action.payload;
        }
    }
});

export const { addMovie,addTrailer } = movieSlice.actions;

export default movieSlice.reducer;
