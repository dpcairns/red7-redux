import { DRAW_ONE, SHUFFLE, TOGGLE_PLAYING, YOU_MELD_ONE, YOU_DRAW_ONE,
  YOU_CANVAS_ONE, CLEAR_HAND, MELD_ONE, TOGGLE_NEW_GAME, CANVAS_ONE, CHANGE_RULES, TOGGLE_SETUP } from '../constants/ActionTypes';

export function drawOne(_currentHand, _currentDeck) {
  return {
    type: DRAW_ONE,
    currentHand: _currentHand,
    currentDeck: _currentDeck,
    topDeck: _currentDeck[0]
  };
}


export function changeRules(_newRules) {
  return {
    type: CHANGE_RULES,
    newRules: _newRules
  };
}


export function toggleSetup() {
  return {
    type: TOGGLE_SETUP
  };
}

export function meldOne(_currentHand, _currentDeck, _selectedCard) {
  return {
    type: MELD_ONE,
    currentHand: _currentHand,
    currentDeck: _currentDeck,
    selectedCard: _selectedCard
  };
}


export function youToCanvas(_currentHand, _currentDeck, _selectedCard) {
  return {
    type: YOU_CANVAS_ONE,
    currentHand: _currentHand,
    currentDeck: _currentDeck,
    selectedCard: _selectedCard
  };
}

export function youDrawOne(_currentHand, _currentDeck) {
  return {
    type: YOU_DRAW_ONE,
    currentHand: _currentHand,
    currentDeck: _currentDeck,
    topDeck: _currentDeck[0]
  };
}


export function youMeldOne(_currentHand, _currentDeck, _selectedCard) {
  return {
    type: YOU_MELD_ONE,
    currentHand: _currentHand,
    currentDeck: _currentDeck,
    selectedCard: _selectedCard
  };
}


export function toCanvas(_currentHand, _currentDeck, _selectedCard) {
  return {
    type: CANVAS_ONE,
    currentHand: _currentHand,
    currentDeck: _currentDeck,
    selectedCard: _selectedCard
  };
}


export function clearHand(){
  return {
    type: CLEAR_HAND
  }
}

export function shuffleDeck(shuffledDeck) {
  return {
    type: SHUFFLE,
    newDeck: shuffledDeck
  };
}


export function togglePlaying() {
  return {
    type: TOGGLE_PLAYING
  };
}

export function toggleNewGame() {
  return {
    type: TOGGLE_NEW_GAME
  };
}
