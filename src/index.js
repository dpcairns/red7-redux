import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */
import './styles/main.scss';
import rootReducer from './reducers/index.js'
/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';

const initialState = {
  deckNow: [],
  myHand: [],
  myTableau: [],
  yourHand: [],
  yourTableau: [],
  canvasNow: [],
  myStatus: {turn: false, winning: false, alreadyMelded: false},
  yourStatus: {turn: false, winning: false, alreadyMedled: false},
  playing: "highest card wins",
  setup: false,
  newGame: false,
}

const store = configureStore(rootReducer, initialState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
