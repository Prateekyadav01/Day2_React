import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Cards/Card';

const Movies = () => {
  const movieData = useSelector((store) => store?.movie?.nowPlayingMovies);

  return (
    <div className='flex flex-wrap justify-evenly gap-4 p-4 bg-black'>
      {movieData &&
        movieData.map((movie) => (
          <Card key={movie.id} data={movie.poster_path} title={movie.title} />
        ))}
    </div>
  );
};

export default Movies;
