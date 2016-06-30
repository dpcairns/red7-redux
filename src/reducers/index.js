import { combineReducers } from 'redux';
import counter from './counter';
import { SHUFFLE, DRAW_ONE, TOGGLE_PLAYING, CLEAR_HAND, MELD_ONE, colorArray } from '../constants/ActionTypes';
import shortid from 'shortid'

let fullDeck = []
  for(let i=1; i<8; i++){
    for(let j=0; j<colorArray.length; j++){
      fullDeck.push( { cardNumber: i, cardColor: colorArray[j], _id: shortid.generate() } )
    }
  }

    function deckNow(state = [], action) {
      switch (action.type) {
      case CLEAR_HAND:
          let array = fullDeck
          let i = 0
          , j = 0
          , temp = null
          for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
            }
            return array
      case DRAW_ONE:
        myHand(action.currentHand, action)
        return state.slice(1, state.length + 1);
      default:
        return state;
      }
    }

function myHand(state = [], action) {
  switch (action.type) {
  case MELD_ONE:
    let selectedCard = state.find( (card) => {
      return card._id === action.selectedCard._id
    })
    return [...state.slice(0, state.indexOf(selectedCard)),
            ...state.slice(state.indexOf(selectedCard) + 1, (state.length))
            ];
  case DRAW_ONE:
    return [...state, action.topDeck];
  case CLEAR_HAND:
    return [];
  default:
    return state;
  }
}


function myTableau(state = [], action) {
  switch (action.type) {
  case MELD_ONE:
    return [...state, action.selectedCard];
  case CLEAR_HAND:
    return [];
  default:
    return state;
  }
}


function playing(state = false, action) {
  switch (action.type) {
  case TOGGLE_PLAYING:
    return !state;
  default:
    return state;
  }
}


const rootReducer = combineReducers({
  deckNow, myHand, myTableau, playing
});

export default rootReducer;
