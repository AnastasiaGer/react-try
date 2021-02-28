import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../SmallMovieCard/SmallMovieCard.jsx";

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
  smallMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        background: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        rating: PropTypes.number.isRequired,
        scores: PropTypes.number.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired
  ).isRequired,
  onMovieCardClick: PropTypes.func,
};
