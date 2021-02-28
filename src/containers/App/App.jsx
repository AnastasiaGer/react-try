
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from "../Main/Main.jsx";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MoviePage from '../MoviePage/MoviePage.jsx';
import {PageNames} from '../../const.js';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: PageNames.MAIN,
      currentMovie: this.props.movieCard,
    };

    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  _renderApp() {
    const {movieCard, smallMovies} = this.props;
    const {currentPage, currentMovie} = this.state;

    if (currentPage === PageNames.MAIN) {
      return (
        <Main
          movieCard={movieCard}
          smallMovies={smallMovies}
          onMovieCardClick={this.handleMovieClick}
        />
      );
    }

    if (currentPage === PageNames.MOVIE_DETAILS) {
      return (
        <MoviePage
          movieCard={currentMovie} />
      );
    }

    return null;
  }

  handleMovieClick(movieCard) {
    this.setState({
      currentPage: PageNames.MOVIE_DETAILS,
      currentMovie: movieCard,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie">
            <MoviePage
              movieCard={this.state.currentMovie}
              onMovieCardClick={this.handleMovieClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movieCard: PropTypes.shape({
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
  }).isRequired,
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
};

export default App;
