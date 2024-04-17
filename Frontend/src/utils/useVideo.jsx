import React, { useState } from 'react'
import { API_CONSTANT } from './Constant';

const useVideo = () => {
    const videoApi = async ()=>{
        try {
            const data = await  fetch('https://api.themoviedb.org/3/movie/976573/videos?language=en-US', API_CONSTANT);
        const response = await data.json();
        console.log(response.results);
        } catch (error) {
            console.error(error);
        }
    }
    useState(()=>{
       videoApi();
    },[])
}

export default useVideo
