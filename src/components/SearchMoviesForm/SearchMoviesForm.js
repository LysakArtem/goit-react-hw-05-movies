import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './SearchMoviesForm.module.css';

export default function SearchMoviesForm({ onSubmit }) {
  const [searchFilm, setSearchFilm] = useState('');

  const handleChange = (e) => {
    setSearchFilm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchFilm);
    setSearchFilm('');
  };
  return (
    <form onSubmit={handleSubmit} className={s.searchForm}>
      <input
        onChange={handleChange}
        value={searchFilm}
        placeholder="Что ищем?"
        className={s.searchFormInput}
      ></input>
      <button type="submit" className={s.searchFormButton}>
        <span className={s.searchFormButtonLabel}>Search</span>
      </button>
    </form>
  );
}

SearchMoviesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
