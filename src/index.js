
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.jsx';
import {MovieCard, smallMovies} from './mocks/films';

const root = document.querySelector(`#root`);

ReactDOM.render(
    <App
      movieCard={MovieCard}
      smallMovies={smallMovies} />,
    root
);
