import React from 'react';

const MainContainer = ({ title, description }) => {
  return (
    <div className="absolute top-[25%] left-[10%] transform translate-x-[-50%] text-white w-[20%] text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg">{description}</p>

      <div className="mt-6">
        <button className="mr-4 px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white">Play</button>
        <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white">More Info</button>
      </div>
    </div>
  );
};

export default MainContainer;
