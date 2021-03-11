/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import PageOverview from '../PageOverview/PageOverview.jsx';
import PageDetails from '../PageDetails/PageDetails.jsx';
import PageReviews from '../PageReviews/PageReviews.jsx';
import MoviesList from '../MoviesList/MoviesList.jsx';
import {CustomPropTypes} from '../../utils/props.js';
import {connect} from 'react-redux';
import {getCurrentMovie} from '../../reducer/app-state/selectors.js';

const MoviePage = (props) => {
  const {currentMovie, movieReviews, renderTabs,
    activeTab, onPlayClick} = props;
  const {title, genre, date, poster, background, rating, description, starring, director, scores, movieDurationTime} = currentMovie;

  const renderActiveTab = () => {
    switch (activeTab) {
      case `Overview`:
        return <PageOverview
          rating={rating}
          scores={scores}
          description={description}
          director={director}
          starring={starring}
        />;
      case `Details`:
        return <PageDetails
          director={director}
          genre={genre}
          movieDurationTime={movieDurationTime}
          starring={starring}
          date={date}
        />;
      case `Reviews`:
        return <PageReviews
          movieReviews={movieReviews}
        />;
      default:
        return ``;
    }
  };
  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={background} alt={title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title"> {title} </h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{date}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => onPlayClick(currentMovie)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={poster} alt="The Grand Budapest Hotel poster" width="218"
                height="327"/>
            </div>

            <div className="movie-card__desc">
              {renderTabs()}

              {renderActiveTab()}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesList
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  renderTabs: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  movieReviews: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.REVIEWS),
    PropTypes.bool,
  ]),
  onMovieCardClick: PropTypes.func,
  onMovieCardHover: PropTypes.func,
  onPlayClick: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentMovie: getCurrentMovie(state),
  };
};

export default connect(mapStateToProps)(MoviePage);
