import React from 'react';
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {cardBgAlt, movieGenre, movieDate, moviesTitles} = props;

  return <Main
    cardBgAlt={cardBgAlt}
    movieGenre={movieGenre}
    movieDate={movieDate}
    moviesTitles={moviesTitles} />;
};

export default App;
