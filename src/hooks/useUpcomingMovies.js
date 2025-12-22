import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TMDB_API_OPTIONS } from '../utils/constants'
import { addUpcomingMovies } from '../utils/moviesSlice.js'

const useUpcomingMovies = () => {
  const dispatch = useDispatch()
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)

  const getUpcomingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', TMDB_API_OPTIONS)
    const json = await data.json()
    dispatch(addUpcomingMovies(json.results))
  }
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies()
  }, [upcomingMovies])
}

export default useUpcomingMovies
