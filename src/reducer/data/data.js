import {extend} from '../../utils/utils';

const createMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.name,
    genre: movie.genre,
    date: movie.released,
    background: movie.background_image,
    poster: movie.poster_image,
    picture: movie.preview_image,
    description: movie.description,
    rating: movie.rating,
    scores: movie.scores_count,
    director: movie.director,
    starring: movie.starring,
    movieDurationTime: movie.run_time,
    videoPreview: movie.preview_video_link,
    videoUrl: movie.video_link,
    isFavorite: movie.is_favorite,
    backgroundColor: movie.background_color,
  };
};

const emptyMovie = {
  title: `Loading...`,
  genre: ``,
  date: 0,
  background: ``,
  poster: ``,
  id: 0,
  description: ``,
  rating: 0,
  votes: 0,
  director: ``,
  starring: [],
  runTime: 0,
  preview: ``,
  videoLink: ``,
  isFavorite: false,
  backgroundColor: ``,
};

const initialState = {
  movieCard: emptyMovie,
  movies: [],
  movieReviews: [],
};

const ActionType = {
  LOAD_MOVIE_CARD: `LOAD_MOVIE_CARD`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
};

const ActionCreator = {
  loadMovieCard: (movieCard) => {
    return {
      type: ActionType.LOAD_MOVIE_CARD,
      payload: movieCard
    };
  },

  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },

  loadMovieReviews: (movieReviews) => {
    return {
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: movieReviews,
    };
  },
};

const Operations = {
  loadMovieCard: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieCard(createMovie(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.catchError());
      });
  },

  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const movies = response.data.map((movie) => createMovie(movie));
        dispatch(ActionCreator.loadMovies(movies));
      })
      .catch(() => {
        dispatch(ActionCreator.catchError());
      });
  },

  loadMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieReviews(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.catchError(true));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIE_CARD:
      return extend(state, {
        movieCard: action.payload,
      });
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_MOVIE_REVIEWS:
      return extend(state, {
        movieReviews: action.payload,
      });
  }

  return state;
};

export {ActionType, ActionCreator, Operations, reducer, initialState};
