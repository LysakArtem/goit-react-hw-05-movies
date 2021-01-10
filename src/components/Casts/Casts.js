import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import NoImage from '../../images/NoImage.jpg';
import s from './Casts.module.css';
import movieAPI from '../../services/movies-api';

export default function Casts({ id }) {
  const [actors, setActors] = useState(null);

  useEffect(() => {
    movieAPI
      .fetchCredits(id)
      .then((data) => {
        setActors(data.cast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <ul className={s.castsList}>
      {actors &&
        actors.map(({ id, profile_path, original_name, character }) => (
          <li key={id} className={s.actorCard}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : NoImage
              }
              alt={original_name}
            />
            <p className={s.actorName}>{original_name}</p>
            <p className={s.character}>{character}</p>
          </li>
        ))}
    </ul>
  );
}

Casts.propTypes = {
  id: PropTypes.string.isRequired,
};
