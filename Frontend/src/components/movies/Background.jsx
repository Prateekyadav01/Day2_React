import React, { useState } from 'react'
import { useSelector } from "react-redux"
import Home from '../Home';

const Background = () => {

    const movieData = useSelector((store) => store.movie?.nowPlayingMovies);

    // console.log(movieData)
    if (!movieData || movieData.length === 0) {
        console.log("No movie data");
        return <div>No movie data</div>;
    }

    const mainMovie = movieData[0];
    const { original_title } = mainMovie;


    return (
        <div className='flex text-white font-bold bg-red-900 '>
            hy
        </div>
    )
}

export default Background
