import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TMDB_API_OPTIONS } from '../utils/constants'
import { addUpcomingMovies } from '../utils/moviesSlice.js'

const useUpcomingMovies = () => {
  const dispatch = useDispatch()
  const getUpcomingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', TMDB_API_OPTIONS)
    const json = await data.json()
    dispatch(addUpcomingMovies(json.results))
  }
  useEffect(() => {
    getUpcomingMovies()
  }, [])
}

export default useUpcomingMovies
