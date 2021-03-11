
import {movieCard, smallMovies, movieReviews} from '../mocks/films.js';
import {DefaultGenre} from "../const.js";
import {extend} from "../utils/utils.js";

const CARDS_BATCH = 8;

const movieTitle = movieCard.title;
const movieGenre = movieCard.genre;
const movieReleaseDate = movieCard.date;

const genres = Array.from(new Set(smallMovies.map((movie) => movie.genre)));
genres.unshift(DefaultGenre);


const initialState = {
  smallMovies,
  movieCard,
  movieTitle,
  movieGenre,
  movieReleaseDate,
  movieReviews,
  activeGenre: DefaultGenre,
  genres,
  cardsToShow: CARDS_BATCH,
  isVideoPlayer: false
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
  PLAY_MOVIE: `PLAY_MOVIE`,
  STOP_MOVIE: `STOP_MOVIE`
};

const getFilmsByGenre = (films, genre) => {
  return films.filter((movie) => movie.genre === genre);
};


const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),

  getFilmsByGenre: (genre) => {
    if (genre === DefaultGenre) {
      return {
        type: ActionType.GET_FILMS_BY_GENRE,
        payload: initialState.smallMovies,
      };
    }

    const filteredFilms = getFilmsByGenre(initialState.smallMovies, genre);

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filteredFilms,
    };
  },

  showMore: () => ({
    type: ActionType.SHOW_MORE,
    payload: CARDS_BATCH,
  }),
  playFullMovie: (isVideoPlayer) => ({
    type: ActionType.PLAY_MOVIE,
    payload: isVideoPlayer,
  }),
  closeFulMovie: (isVideoPlayer) => ({
    type: ActionType.STOP_MOVIE,
    payload: isVideoPlayer,
  }),
};

const reducer = (state = extend(initialState), action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return extend(state, {
        activeGenre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        smallMovies: action.payload,
      });
    case ActionType.SHOW_MORE:
      return extend(state, {cardsToShow: state.cardsToShow + action.payload});
    case (ActionType.PLAY_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
    case (ActionType.STOP_MOVIE):
      return extend(state, {
        isVideoPlayer: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, genres, getFilmsByGenre};
