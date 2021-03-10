import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from '../VideoPlayer/VideoPlayer.jsx';
import {CustomPropTypes} from '../../utils/props.js';

export default class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVideoPlaying: false
    };
  }

  render() {

    const {movieCard, onMovieCardClick} = this.props;
    const {poster, title} = movieCard;
    const {isVideoPlaying} = this.state;

    const handleMovieCardClick = (evt) => {
      evt.preventDefault();
      onMovieCardClick(movieCard);
    };

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseOver={() => {
          this.setState({
            isVideoPlaying: true
          });
        }}
        onMouseOut={() => {
          this.setState({
            isVideoPlaying: false
          });
        }}
      >
        <div
          onClick={handleMovieCardClick}
          className="small-movie-card__image">
          <VideoPlayer
            movieCard={movieCard}
            isPlaying={isVideoPlaying}
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
  }
}

SmallMovieCard.propTypes = {
  movie: CustomPropTypes.MOVIE,
  onMovieCardClick: PropTypes.func,
  onMovieCardHover: PropTypes.func,
};

