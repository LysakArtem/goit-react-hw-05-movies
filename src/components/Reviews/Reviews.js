import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import s from './Reviews.module.css';
import movieAPI from '../../services/movies-api';

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    movieAPI
      .fetchReviews(id)
      .then((data) => {
        setReviews(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  if (reviews && reviews.length === 0) {
    return <p>Пока нет рецензий по данному фильму!</p>;
  }
  return (
    <ul className={s.reviewsList}>
      {reviews &&
        reviews.map(({ id, author, content }) => (
          <li key={id} className={s.actorCard}>
            <p className={s.author}>Author:{author}</p>
            <p className={s.review}> {content}</p>
          </li>
        ))}
    </ul>
  );
}

Reviews.propTypes = {
  id: PropTypes.string,
};
