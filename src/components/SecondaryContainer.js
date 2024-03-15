import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className=" bg-black w-screen">
        <div className=" md:-mt-72 mt-0 relative z-20 md:pl-12 pl-4">
          <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
          <MovieList title={'Top Rated'} movies={movies.topRatedMovies} />
          <MovieList title={'Popular'} movies={movies.popularMovies} />
          <MovieList title={'Upcoming'} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;