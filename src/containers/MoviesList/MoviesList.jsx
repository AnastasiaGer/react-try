import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../SmallMovieCard/SmallMovieCard.jsx";

const MoviesList = (props) => {
  // eslint-disable-next-line react/prop-types
  const {smallMovies} = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {smallMovies.map((movie, index) => {
          return (
            <SmallMovieCard
              key={movie.title + index}
              movie={movie}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

MoviesList.propTypes = {
  smallMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
      })
  ),
};

export default MoviesList;
