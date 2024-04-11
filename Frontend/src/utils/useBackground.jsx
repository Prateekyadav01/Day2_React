import { useEffect } from "react"
import { API_CONSTANT } from "./Constant";
import { useDispatch } from 'react-redux'
import { addMovie } from "./movieSlice";

import React from 'react'

const useBackground = () => {
    const dispatch = useDispatch();
    const data = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_CONSTANT);
        const response = await data.json();
        console.log(response.results);
        dispatch(addMovie(response.results));
    }
    useEffect(() => {
        data();
    }, [])
}

export default useBackground;
