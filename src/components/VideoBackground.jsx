import React from 'react'
import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId)
  const movieTrailer = useSelector((store) => store.movies.movieTrailer)
  return (
    <div className='w-screen aspect-video'>
      <iframe className='w-full h-full object-cover' 
      src={`https://www.youtube.com/embed/${movieTrailer?.key}?autoplay=1&mute=1`} 
      title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
    </div>
  )
}

export default VideoBackground