import { DRAW_ONE, SHUFFLE, TOGGLE_PLAYING, CLEAR_HAND, MELD_ONE } from '../constants/ActionTypes';

export function drawOne(_currentHand, _currentDeck) {
  return {
    type: DRAW_ONE,
    currentHand: _currentHand,
    currentDeck: _currentDeck,
    topDeck: _currentDeck[0]
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
