
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Main from "../Main/Main.jsx";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MoviePage from '../MoviePage/MoviePage.jsx';
import {PageNames} from '../../const.js';
import {CustomPropTypes} from '../../utils/props.js';
import {connect} from "react-redux";
import {getMovies, getMovieCard, getMovieReviews} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/app-state/app-state';
import {getMoviesGenres} from '../../reducer/data/selectors';
import {getActiveGenre, getIsMoviePlayerActive} from '../../reducer/app-state/selectors';
import FullVideoPlayer from '../FullVideoPlayer/FullVideoPlayer.jsx';
import withVideoControls from '../../hocs/with-full-video.js';
import withTabs from '../../hocs/with-tabs.jsx';


const FullVideoPlayerWrapped = withVideoControls(FullVideoPlayer);
const MoviePageWrapped = withTabs(MoviePage);
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
        <MoviePageWrapped
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
  activeGenre: getActiveGenre(state),
  smallMovies: getMovies(state),
  movieCard: getMovieCard(state),
  movieReviews: getMovieReviews(state),
  genres: getMoviesGenres(state),
  shown: state.cardsToShow,
  isVideoPlayer: getIsMoviePlayerActive(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
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
