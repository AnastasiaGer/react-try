import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = ({movie, onCardHover, onTitleClick}) => {
  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onCardHover}
    >
      <div className="small-movie-card__image">
        <img src={movie.image} alt={movie.title} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onTitleClick}
      >
        <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
      </h3>
    </article>);
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClick: PropTypes.func,
  onCardHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;

