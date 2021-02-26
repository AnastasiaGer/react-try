import React from 'react';
import PropTypes from 'prop-types';

const Movies = (props) => {
  // eslint-disable-next-line react/prop-types
  const {moviesTitles} = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {moviesTitles.map((moviesTitle, index) => {
          return (
            <article key={moviesTitle + index} className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt={moviesTitle} width="280" height="175" />
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">{moviesTitle}</a>
              </h3>
            </article>);
        })}
      </div> </React.Fragment>
  );
};

Movies.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieDate: PropTypes.string.isRequired,
  moviesTitles: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
};

export default Movies;
