import React from 'react'
import { useSelector } from 'react-redux'

const Movies = () => {
  const movieData = useSelector((store)=>store?.movie?.nowPlayingMovies)
  console.log(movieData);
  return (
    <div>
      {
        movieData.map((e,i)=>(
          <div key={i}>
            <h1>{e.poster_path}</h1>
            <h2>{e.overview}</h2>
          </div>
        ))
      }
    </div>
  )
}

export default Movies
