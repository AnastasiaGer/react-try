
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from "../Main/Main.jsx";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MoviePage from '../MoviePage/MoviePage.jsx';
import {PageNames} from '../../const.js';
import {CustomPropTypes} from '../../utils/props.js';
import {connect} from "react-redux";
// import {ActionCreator} from "../../reducer/reducer.js";


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
    const {movieCard, smallMovies, movieReviews, onMovieCardClick, onMovieCardHover} = this.props;
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
          movieCard={currentMovie}
          movieReviews={movieReviews}
          smallMovies={smallMovies}
          onMovieCardClick={onMovieCardClick}
          onMovieCardHover={onMovieCardHover}
        />
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
  movieCard: CustomPropTypes.MOVIE,
  smallMovies: PropTypes.arrayOf(CustomPropTypes.MOVIE),
  movieReviews: CustomPropTypes.REVIEWS,
  onMovieCardClick: PropTypes.func,
  onMovieCardHover: PropTypes.func,
};

const mapStateToProps = (state) => ({
  smallMovies: state.smallMovies,
  movieCard: state.movieCard,
  movieReviews: state.movieReviews,
});

// const mapDispatchToProps = (dispatch) => ({
//   onGenreItemClick(genre) {
//     dispatch(ActionCreator.getFilmsByGenre(genre));
//     dispatch(ActionCreator.changeFilter(genre));
//   },
// });

export {App};
export default connect(mapStateToProps)(App);
