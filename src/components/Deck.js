import React, { Component, PropTypes } from 'react';
import Card from './Card'
import Hand from './Hand'
import Canvas from './Canvas'
import Pallette from './Pallette'

export default class Deck extends Component {
    componentWillMount(){
      this.props.clearHand()
    }

  render() {
    let { deckNow, meldOne, myHand, newGame, canvasNow, toCanvas,
      toggleNewGame, myTableau, clearHand, drawOne,
      colorArray, togglePlaying, playing } = this.props

      if(deckNow.length > 0 && myHand.length <= 5){
        if(newGame === true){
        drawOne(myHand, deckNow)
        }
        if(myHand.length >= 5){
          toggleNewGame()
        }
      }
    return (

      <div style={{textAlign: "center"}}>
                <button onClick={toggleNewGame.bind(this)}>
                  {/*myHand.length === 0 ? "New game" : "End game"*/} new game
                </button>
              <button onClick={clearHand.bind(this)}>
                {/*myHand.length === 0 ? "New game" : "End game"*/} clear hand
              </button>
            <button onClick={deckNow.length > 0 ? drawOne.bind(this, myHand, deckNow) : clearHand.bind(this)}>
                Draw a card
            </button>
          <hr/>
            <h3>(the deck has {deckNow.length} cards.)</h3>
          <hr/>
            <Canvas canvasNow={canvasNow}/>
          <hr/>
            <Hand meldOne={meldOne} toCanvas={toCanvas} deckNow={deckNow} myHand={myHand} drawOne={drawOne} />
          <hr/>
            <Pallette myTableau={myTableau} />
        </div>
    )
  }
}

/*
Deck.propTypes = {
  deckNow: PropTypes.array.isRequired,
};*/
