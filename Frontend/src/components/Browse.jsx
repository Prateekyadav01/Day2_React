import React from 'react'
import Home from './Home'
import Background from './movies/Background'
import Movies from './movies/Movies'
import useBackground from '../utils/useBackground'

const Browse = () => {
  useBackground()
  return (
    <div>
     <Home/>
    
     <Background/>
     <Movies/>
    
    </div>
  )
}

export default Browse
