import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { TMDB_API_OPTIONS } from "../utils/constants"
import { addMovieTrailer } from "../utils/moviesSlice"

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch()
  const getMovieTrailer = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, TMDB_API_OPTIONS)
      const json = await data.json()
      const featuredTrailer = json.results.find((video) => video.type === 'Trailer')
      const trailer = featuredTrailer ? featuredTrailer : json.results[0]
      dispatch(addMovieTrailer(trailer))
    }
  useEffect(() => {
    getMovieTrailer()
  }, [])
}

export default useMovieTrailer