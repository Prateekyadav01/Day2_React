import React, { useState } from 'react'
import { API_CONSTANT } from './Constant';
import { useDispatch } from 'react-redux';
import { addTrailer } from './movieSlice';

const useVideo = () => {
    const dispatch = useDispatch();
    const videoApi = async ()=>{
        try {
            const data = await  fetch('https://api.themoviedb.org/3/movie/976573/videos?language=en-US', API_CONSTANT);
        const response = await data.json();
        // console.log(response.results);
        const filterData = response.results.filter((e)=> e.type==="Trailer");
        const trailer = filterData.length>0 ? filterData[0] : response.results[0];
        dispatch(addTrailer(trailer));
        // console.log(trailer);
        } catch (error) {
            console.error(error);
        }
    }
    useState(()=>{
       videoApi();
    },[])
}

export default useVideo
