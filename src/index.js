
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.jsx';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import thunk from "redux-thunk";
import {createAPI} from './api';
import {composeWithDevTools} from "redux-devtools-extension";
import {Operations as DataOperations} from "./reducer/data/data";

const root = document.querySelector(`#root`);

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperations.loadMovieCard());
store.dispatch(DataOperations.loadMovies());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    root
);
