import React from 'react'

const MovieCard = ({ posterPath }) => {
  return (
    <div className='w-48 pr-4'>
      <img src={posterPath} alt='Movie Poster' />
    </div>
  )
}

export default MovieCard