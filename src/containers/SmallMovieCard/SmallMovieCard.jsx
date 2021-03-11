import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from '../VideoPlayer/VideoPlayer.jsx';
import {CustomPropTypes} from '../../utils/props.js';

const SmallMovieCard = (props) => {
  const {movieCard, onMovieCardClick, isPlaying, setPlayingFilm} = props;
  const {poster, title} = movieCard;

  const handleMovieCardClick = (evt) => {
    evt.preventDefault();
    onMovieCardClick(movieCard);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={() => setPlayingFilm(true)}
      onMouseOut={() => setPlayingFilm(false)}
    >
      <div
        onClick={handleMovieCardClick}
        className="small-movie-card__image">
        <VideoPlayer
          movieCard={movieCard}
          isPlaying={isPlaying}
        />
        <img src={poster} alt={title} width="280" height="175" />
      </div>
      <h3
        onClick={handleMovieCardClick}
        className="small-movie-card__title"
      >
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movieCard: CustomPropTypes.MOVIE,
  onMovieCardClick: PropTypes.func,
  onMovieCardHover: PropTypes.func,
  isPlaying: PropTypes.bool,
  setPlayingFilm: PropTypes.func,
};

export default SmallMovieCard;
