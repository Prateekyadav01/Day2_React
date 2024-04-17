import React, { useState } from 'react'
import useVideo from '../../utils/useVideo';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {

    useVideo();
    const movieTrailer = useSelector((store)=> store?.movie?.trailerMovie);
    
    if(!movieTrailer) return;
    return (
        <div>
            <iframe 
            className='w-screen aspect-video'
            src={"https://www.youtube.com/embed/" + movieTrailer?.key}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
    )
}

export default SecondaryContainer
