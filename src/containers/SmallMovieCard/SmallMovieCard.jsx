import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movieCard, onMovieCardHover, onMovieCardClick} = props;
  const {poster, title} = movieCard;

  const handleMovieCardClick = (evt) => {
    evt.preventDefault();
    onMovieCardClick(movieCard);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieCardHover}
    >
      <div
        onClick={handleMovieCardClick}
        className="small-movie-card__image">
        <img src={poster} alt={title} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={handleMovieCardClick}
      >
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>);
};

SmallMovieCard.propTypes = {
  movieCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onMovieCardClick: PropTypes.func,
  onMovieCardHover: PropTypes.func,
};

export default SmallMovieCard;

