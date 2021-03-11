import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../SmallMovieCard/SmallMovieCard.jsx";
import {CustomPropTypes} from '../../utils/props.js';
import withVideo from "../../hocs/with-video";

const SmallMovieCardWrapped = withVideo(SmallMovieCard);

const MoviesList = (props) => {
  const {smallMovies, onMovieCardClick, handleSmallMovieCardHover} = props;
  return (
    <div className="catalog__movies-list">
      {smallMovies.map((movieCard, index) => {
        return (
          <SmallMovieCardWrapped
            key={movieCard.title + index}
            movieCard={movieCard}
            onMovieCardClick={onMovieCardClick}
            handleSmallMovieCardHover={handleSmallMovieCardHover}
          />
        );
      })}
    </div>
  );
};

MoviesList.propTypes = {
  smallMovies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  onMovieCardClick: PropTypes.func,
  handleSmallMovieCardHover: PropTypes.func,
};

export default MoviesList;
