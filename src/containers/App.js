import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Red7Actions from '../actions/Red7Actions';
import Deck from '../components/Deck';
import Hand from '../components/Hand';

export default class App extends Component {
  render() {
    let {deckNow, myHand, newGame, playing, actions, myTableau, canvasNow} = this.props
    return (
      <div className="main-app-container">
        <div className="main-app-nav">Red 7</div>
        <Deck clearHand={actions.clearHand} playing={playing} myHand={myHand}
        shuffleDeck={actions.shuffleDeck} meldOne={actions.meldOne} drawOne={actions.drawOne}
        togglePlaying={actions.togglePlaying} deckNow={deckNow} canvasNow={canvasNow}
        myTableau={myTableau} toggleNewGame={actions.toggleNewGame} toCanvas={actions.toCanvas} newGame={newGame}/>
      </div>
    );
  }
}

/*
App.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};*/

function mapStateToProps(state) {
  return {
    deckNow: state.deckNow,
    myHand: state.myHand,
    myTableau: state.myTableau,
    playing: state.playing,
    newGame: state.newGame,
    canvasNow: state.canvasNow
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Red7Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
