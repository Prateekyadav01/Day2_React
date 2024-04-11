import React, { useState } from 'react'
import useBackground from '../../utils/useBackground'
import { useSelector } from "react-redux"

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
        <div className='flex top-10'>
            <h1 className='flex top-20'>{original_title}</h1>
        </div>
    )
}

export default Background
