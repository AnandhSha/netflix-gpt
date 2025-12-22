import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TMDB_API_OPTIONS } from '../utils/constants'
import { addPopularMovies } from '../utils/moviesSlice.js'

const usePopularMovies = () => {
  const dispatch = useDispatch()
  const popularMovies = useSelector((store) => store.movies.popularMovies)

  const getPopularMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular', TMDB_API_OPTIONS)
    const json = await data.json()
    dispatch(addPopularMovies(json.results))
  }
  useEffect(() => {
    !popularMovies && getPopularMovies()
  }, [popularMovies])
}

export default usePopularMovies