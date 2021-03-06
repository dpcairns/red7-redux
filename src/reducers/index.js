import { combineReducers } from 'redux';
import counter from './counter';
import { SHUFFLE, DRAW_ONE, TOGGLE_PLAYING, CLEAR_HAND, MELD_ONE,
  YOU_MELD_ONE, YOU_DRAW_ONE, CHANGE_RULES, NEW_TURN, I_AM_WINNING, I_AM_LOSING, YOU_ARE_LOSING, YOU_ARE_WINNING,
  YOU_CANVAS_ONE, TOGGLE_NEW_GAME, CANVAS_ONE, colorArray } from '../constants/ActionTypes';
import shortid from 'shortid'

let fullDeck = []
  for(let i=1; i<8; i++){
    for(let j=0; j<colorArray.length; j++){
      fullDeck.push( { cardNumber: i, cardColor: colorArray[j], _id: shortid.generate(),
        isEven: (i %2 === 0), isBelowFour: (i < 4) } )
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
      case YOU_DRAW_ONE:
          yourHand(action.currentHand, action)
          return state.slice(1, state.length + 1);

      default:
        return state;
      }
    }

    function newGame(state = false, action) {
      switch (action.type) {
      case TOGGLE_NEW_GAME:
        return !state;
      default:
        return state;
      }
    }

function myHand(state = [], action) {
  switch (action.type) {
  case MELD_ONE:
    let tableauCard = state.find( (card) => {
      return card._id === action.selectedCard._id
    })
    return [...state.slice(0, state.indexOf(tableauCard)),
            ...state.slice(state.indexOf(tableauCard) + 1, (state.length))
            ];
  case CANVAS_ONE:
    let canvasCard = state.find( (card) => {
      return card._id === action.selectedCard._id
    })
    return [...state.slice(0, state.indexOf(canvasCard)),
            ...state.slice(state.indexOf(canvasCard) + 1, (state.length))
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


function myStatus(state = {turn: false, winning: false, alreadyMelded: false}, action) {
  switch (action.type) {
  case TOGGLE_NEW_GAME:
    return {turn: true, winning: false, alreadyMelded: false}
  case NEW_TURN:
    return Object.assign( {}, state, {turn: !state.turn} );
  case MELD_ONE:
    return {turn: state.turn, winning: state.winning, alreadyMelded: true};
  case CANVAS_ONE:
    return {turn: false, winning: state.winning, alreadyMelded: false};
  case YOU_CANVAS_ONE:
    return {turn: true, winning: state.winning, alreadyMelded: state.alreadyMelded};
  case I_AM_WINNING:
    return {turn: state.turn, winning: true, alreadyMelded: state.alreadyMelded};
  case I_AM_LOSING:
    return {turn: state.turn, winning: false, alreadyMelded: state.alreadyMelded};
  default:
    return state;
  }
}

function yourStatus(state = {turn: false, winning: false, alreadyMelded: false}, action) {
  switch (action.type) {
  case TOGGLE_NEW_GAME:
   return {turn: false, winning: false, alreadyMelded: false}
  case NEW_TURN:
    return Object.assign( {}, state, {turn: !state.turn} );
  case CANVAS_ONE:
    return {turn: true, winning: state.winning, alreadyMelded: false};
  case YOU_MELD_ONE:
    return {turn: state.turn, winning: state.winning, alreadyMelded: true};
  case YOU_CANVAS_ONE:
    return {turn: false, winning: state.winning, alreadyMelded: state.alreadyMelded};
  case YOU_ARE_WINNING:
    return {turn: state.turn, winning: true, alreadyMelded: state.alreadyMelded};
  case YOU_ARE_LOSING:
    return {turn: state.turn, winning: false, alreadyMelded: state.alreadyMelded};
  default:
    return state;
  }
}


function yourHand(state = [], action) {
  switch (action.type) {
  case YOU_MELD_ONE:
    let yourTableauCard = state.find( (card) => {
      return card._id === action.selectedCard._id
    })
    return [...state.slice(0, state.indexOf(yourTableauCard)),
            ...state.slice(state.indexOf(yourTableauCard) + 1, (state.length))
            ];
  case YOU_CANVAS_ONE:
    let yourCanvasCard = state.find( (card) => {
      return card._id === action.selectedCard._id
    })
    return [...state.slice(0, state.indexOf(yourCanvasCard)),
            ...state.slice(state.indexOf(yourCanvasCard) + 1, (state.length))
            ];
  case YOU_DRAW_ONE:
    return [...state, action.topDeck];
  case CLEAR_HAND:
    return [];
  default:
    return state;
  }
}


function yourTableau(state = [], action) {
  switch (action.type) {
  case YOU_MELD_ONE:
    return [...state, action.selectedCard];
  case CLEAR_HAND:
    return [];
  default:
    return state;
  }
}



function canvasNow(state = [], action) {
  switch (action.type) {
  case CANVAS_ONE:
    return [...state, action.selectedCard];
  case YOU_CANVAS_ONE:
      return [...state, action.selectedCard];
  case CLEAR_HAND:
    return [];
  default:
    return state;
  }
}



function playing(state = "highest card wins", action) {
  switch (action.type) {
  case CHANGE_RULES:
    return action.newRules;
  default:
    return state;
  }
}




const rootReducer = combineReducers({
  deckNow, myHand, myTableau, playing, newGame, canvasNow, yourHand, yourTableau, myStatus, yourStatus
});

export default rootReducer;
