import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../SmallMovieCard/SmallMovieCard.jsx";
import {CustomPropTypes} from '../../utils/props.js';

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentMovie: null
    };
  }

  render() {
    const {smallMovies, onMovieCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {smallMovies.map((movieCard, index) => {
          return (
            <SmallMovieCard
              key={movieCard.title + index}
              movieCard={movieCard}
              onMovieCardClick={onMovieCardClick}
              onCardHover={() => {
                this.setState({
                  currentMovie: movieCard
                });
              }}
            />
          );
        })}
      </div>
    );
  }
}

MoviesList.propTypes = {
  smallMovies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  onMovieCardClick: PropTypes.func,
};
