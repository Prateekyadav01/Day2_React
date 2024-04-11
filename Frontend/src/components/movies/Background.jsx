import React, { useState } from 'react'
import  useBackground  from '../../utils/useBackground'
import {useSelector} from "react-redux";

const Background = () => {
     
  
  const movieData = useSelector((store) => store.movie?.nowPlayingMovies);
  console.log(movieData);
 
  if(!movieData) return console.log("No movie data");
  useBackground();


  return (
    <div>
         {/* <h1>{movieData[0].title}</h1> */}
    </div>
  )
}

export default Background
