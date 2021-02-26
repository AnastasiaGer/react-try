import React from 'react';
import Main from "../Main/Main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movieCard, smallMovies} = props;

  const handleTitleClick = (evt) => {
    evt.preventDefault();
  };

  const handleCardHover = (evt) => {
    evt.preventDefault();
  };
  return <Main
    movieCard={movieCard}
    smallMovies={smallMovies}
    onTitleClick={handleTitleClick}
    onCardHover={handleCardHover}
  />;
};

export default App;
