import React from 'react';

const Card = ({ data, title }) => {
  return (
    <div className='w-full md:w-[20vw] flex flex-col md:flex-row md:items-center md:justify-center md:mr-4 md:mb-4 flex-wrap'>
      <div className='bg-black rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
        <img
          src={`https://image.tmdb.org/t/p/w500${data}`}
          className='h-[30vh] md:h-auto w-full object-cover'
          alt=''
        />
        <div className='p-4'>
          <h1 className='text-xl md:text-2xl font-bold mt-4 text-white'>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
