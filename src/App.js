import './App.css';
import { lazy, Suspense } from 'react';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SearchMoviesForm from './components/SearchMoviesForm/SearchMoviesForm';
// import SearchMovies from './components/SearchMovies/SearchMovies';

// import HomePage from './views/HomeView';
import NotFoundView from './views/NotFoundView';
// import FilmDetailsView from './views/FilmDetailsView';

const HomePage = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "HomeView"*/)
);
const FilmDetailsView = lazy(() =>
  import('./views/FilmDetailsView' /* webpackChunkName: "FilmDetailsView"*/)
);
const SearchMovies = lazy(() =>
  import(
    './components/SearchMovies/SearchMovies' /* webpackChunkName: "SearchMovies"*/
  )
);

function App() {
  const [searchFilm, setSearchFilm] = useState('');

  return (
    <>
      <Navigation />
      <Suspense fallback={<h2>Loading</h2>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <SearchMoviesForm onSubmit={setSearchFilm} />
            <SearchMovies searchMovies={searchFilm} />
          </Route>
          <Route path="/movies/:movieId">
            <FilmDetailsView />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
