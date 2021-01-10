import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import imageAPI from '../../services/movies-api';
import MovieCard from '../MovieCard/MovieCard';
import s from './SearchMovies.module.css';

export default function SearchMovies({ searchMovies }) {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (!searchMovies) {
      return;
    }
    imageAPI
      .fetchMovies(searchMovies)
      .then((data) => {
        setMovies(data.results);
        setTotalResults(data.total_results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchMovies]);
  return (
    <>
      {totalResults === 0 ? (
        <h2>По вашему запросу ничего не найдено!</h2>
      ) : (
        <ul className={s.cardList}>
          {movies.map((movie) => (
            <li key={movie.id} className={s.cardItem}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
                className={s.link}
              >
                <MovieCard movie={movie} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

SearchMovies.propTypes = {
  searchMovies: PropTypes.string.isRequired,
};
