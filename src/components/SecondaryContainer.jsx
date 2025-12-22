import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } = useSelector((store) => store.movies)
  return (
    <div className='bg-black'>
      <div className='mt-3 md:-mt-60 pl-4 md:pl-12 relative z-20'>
      {nowPlayingMovies && <MovieList title='Now Playing' movies={nowPlayingMovies} />}
      {popularMovies && <MovieList title='Popular' movies={popularMovies} />}
      {topRatedMovies && <MovieList title='Top Rated' movies={topRatedMovies} />}
      {upcomingMovies && <MovieList title='Upcoming' movies={upcomingMovies} />}
      </div>
    </div>
  )
}

export default SecondaryContainer