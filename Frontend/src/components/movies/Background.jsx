import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Home from '../Home';

const Background = () => {

    const movieData = useSelector((store) => store.movie?.nowPlayingMovies);
    console.log(movieData)



    if (!movieData || movieData.length === 0) {
        console.log("No movie data");
        return <div>No movie data</div>;
    }

    const mainMovie = movieData[0];
    const { original_title } = mainMovie;


    return (
        <div className='flex min-w-full border-2 border-solid'>
            
        </div>
    )
}

export default Background
