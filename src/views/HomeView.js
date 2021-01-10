import movieAPI from '../services/movies-api';
import MovieCard from '../components/MovieCard/MovieCard';
import s from './HomeView.module.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function HomeView() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  //   const { path } = useRouteMatch();

  useEffect(() => {
    movieAPI
      .fetchTrending()
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2 className={s.title}>Trending today</h2>
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
    </>
  );
}
