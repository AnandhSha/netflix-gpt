import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { languageConstants } from '../utils/languageConstants'
import { useRef } from 'react'
import openAi from '../utils/openAi'
import { addGptMovieResults } from '../utils/gptSlice'
import { TMDB_API_OPTIONS } from '../utils/constants'

const GptSearchbar = () => {
  const dispatch = useDispatch()
  const language = useSelector((store) => store.config.language)
  const searchQuery = useRef('')

  const searchTMDBMovies = async (movie) => {
    const movieData = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, TMDB_API_OPTIONS)
    const json = await movieData.json()
    return json
  }

  const handleSearch = async () => {
    const query = searchQuery.current.value

    const gptResponse = await openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Act as a movie recommendation assistant. Based on the query, recommend 5 movies. Query: ${query} only return the 5 movie names in a comma separated list.like the example: "Movie 1, Movie 2, Movie 3, Movie 4, Movie 5"`,
        },
      ],
    })

    const movieNames = gptResponse.choices[0]?.message?.content?.split(',').map((name) => name.trim())

    const promiseArray = movieNames?.map((movie) => searchTMDBMovies(movie))

    const tmdbMovieResults = await Promise.all(promiseArray)

    dispatch(addGptMovieResults({movieNames: movieNames, tmdbMovieResults: tmdbMovieResults}))
  }

  return (
    <div className='pt-[10%] z-50 text-white flex justify-center'>
      <form onSubmit={(event) => event.preventDefault()} className='flex w-1/2 p-6 m-6 grid grid-cols-12 gap-4 justify-center items-center'>
        <input type="text" placeholder={languageConstants[language].placeholder} className='p-4 my-4 bg-white border border-gray-300 text-black rounded-lg col-span-10' ref={searchQuery} />
        <button className='p-4 my-4 bg-red-700 rounded-lg col-span-2' onClick={handleSearch}>{languageConstants[language].search}</button>
      </form>
    </div>
  )
}
export default GptSearchbar