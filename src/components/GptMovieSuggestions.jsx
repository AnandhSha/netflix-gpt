import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
  const gptMovieNames = useSelector((store) => store.gpt.gptMovieNames)
  const tmdbMovieResults = useSelector((store) => store.gpt.tmdbMovieResults)

  if(!gptMovieNames) return

  return (
    <div className='p-4 m-4 bg-black bg-opacity-70 text-white'>
      <div>
      {gptMovieNames.map((movieName, index) => (
        <MovieList key={index} title={movieName} movies={tmdbMovieResults[index]?.results} />
      ))}
    </div>
    </div>
  )
}

export default GptMovieSuggestions