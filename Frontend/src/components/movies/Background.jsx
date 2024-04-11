import React, { useState } from 'react'
import  useBackground  from '../../utils/useBackground'
import {useSelector} from 'react-redux';

const Background = () => {

  const movieData = useSelector((store)=>store.movie?.nowPlayingMovie);
  console.log(movieData);
 
  if(!movieData) return;
 
  useBackground();


  return (
    <div>
         
    </div>
  )
}

export default Background
