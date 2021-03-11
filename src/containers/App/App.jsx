
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from "../Main/Main.jsx";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MoviePage from '../MoviePage/MoviePage.jsx';
import {PageNames} from '../../const.js';
import {CustomPropTypes} from '../../utils/props.js';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer.js";
import FullVideoPlayer from '../FullVideoPlayer/FullVideoPlayer.jsx';
import withVideoControls from '../../hocs/with-full-video.js';

const FullVideoPlayerWrapped = withVideoControls(FullVideoPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: PageNames.MAIN,
      currentMovie: this.props.movieCard,
    };
    this._renderMoviePlayer = this._renderMoviePlayer.bind(this);
    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  _renderApp() {
    const {movieCard, smallMovies, movieReviews, onMovieCardClick, onMovieCardHover, genres, activeGenre, onGenreItemClick, onShowMoreClick, shown, isVideoPlayer, onPlayButtonClick} = this.props;
    const {currentPage, currentMovie} = this.state;

    if (isVideoPlayer) {
      return this._renderMoviePlayer();
    }


    if (currentPage === PageNames.MAIN) {
      return (
        <Main
          movieCard={movieCard}
          smallMovies={smallMovies}
          onMovieCardClick={this.handleMovieClick}
          genres={genres}
          activeGenre={activeGenre}
          onGenreItemClick={onGenreItemClick}
          onShowMoreClick={onShowMoreClick}
          shown={shown}
          onPlayClick={onPlayButtonClick}
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
          onPlayClick={onPlayButtonClick}
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

  _renderMoviePlayer() {
    const {movieCard, handleCloseButtonClick} = this.props;
    return (
      <FullVideoPlayerWrapped
        movieCard={movieCard}
        onClosePlayerClick={handleCloseButtonClick}
      />
    );
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
  activeGenre: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  onGenreItemClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  shown: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func,
  handleCloseButtonClick: PropTypes.func,
  isVideoPlayer: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
  smallMovies: state.smallMovies,
  movieCard: state.movieCard,
  movieReviews: state.movieReviews,
  genres: state.genres,
  shown: state.cardsToShow,
  isVideoPlayer: state.isVideoPlayer,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.getFilmsByGenre(genre));
    dispatch(ActionCreator.changeFilter(genre));
  },
  onShowMoreClick() {
    dispatch(ActionCreator.showMore());
  },
  onPlayButtonClick(isVideoPlayer) {
    dispatch(ActionCreator.playFullMovie(isVideoPlayer));
  },
  handleCloseButtonClick(isVideoPlayer) {
    dispatch(ActionCreator.closeFulMovie(isVideoPlayer));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
