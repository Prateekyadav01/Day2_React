import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Home from '../Home';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Background = () => {

    const movieData = useSelector((store) => store.movie?.nowPlayingMovies);
    // console.log(movieData)



    if (!movieData || movieData.length === 0) {
        console.log("No movie data");
        return <div>No movie data</div>;
    }

    const mainMovie = movieData[0];
    const { original_title ,overview } = mainMovie;


    return (
       <div className='pt-36'>
        <MainContainer title={original_title} description={overview} />
        <SecondaryContainer movie={movieData}/>
       </div>
    )
}

export default Background
