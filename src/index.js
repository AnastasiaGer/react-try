
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.jsx';
import {movieCard, smallMovies} from './mocks/films';

const root = document.querySelector(`#root`);

ReactDOM.render(
    <App
      movieCard={movieCard}
      smallMovies={smallMovies} />,
    root
);
