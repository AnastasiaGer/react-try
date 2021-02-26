import React from 'react';
import Main from "../Main/Main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movieCard, smallMovies} = props;

  return <Main
    movieCard={movieCard}
    smallMovies={smallMovies} />;
};

export default App;
