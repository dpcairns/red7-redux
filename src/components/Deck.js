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
    let { deckNow, meldOne, myHand, newGame, canvasNow, toCanvas, youMeldOne, youDrawOne, youToCanvas,
      toggleNewGame, myTableau, clearHand, drawOne, yourHand, yourTableau, changeRules,
      colorArray, togglePlaying, playing, setup } = this.props

      if(newGame===true){

            if(deckNow.length > 0){
                    if(myHand.length <= 5){
                    drawOne(myHand, deckNow)
                    }
                    else if(myHand.length >= 5 && yourHand.length <= 5){
                    youDrawOne(yourHand, deckNow)
                    } else {
                    toggleNewGame()
                    }
                  }
              }

    return (

      <div style={{textAlign: "center"}}>
              <button onClick={ () => {clearHand(); toggleNewGame()} }>
              new game
              </button>
            <button onClick={deckNow.length > 0 ? drawOne.bind(this, myHand, deckNow) : clearHand.bind(this)}>
                Draw a card
            </button>
          <hr/>
            <h3>(the deck has {deckNow.length} cards.)</h3>
          <hr/>
            <Canvas playing={playing} changeRules={changeRules} canvasNow={canvasNow}/>
          <hr/>

          <div style={{width:"45%", float: "left", border: "1px solid black", margin: "10px"}}>
                ME
                    <Hand meldOne={meldOne} toCanvas={toCanvas} deckNow={deckNow} myHand={myHand} drawOne={drawOne} />
                    <hr/>
                    <Pallette myTableau={myTableau} />
            </div>

            <div style={{width:"45%", float: "left", border: "1px solid black", margin: "10px"}}>
            YOU
                      <Hand meldOne={youMeldOne} toCanvas={youToCanvas} deckNow={deckNow} myHand={yourHand} drawOne={youDrawOne} />
                      <hr/>
                      <Pallette myTableau={yourTableau} />
              </div>
            </div>
    )
  }
}

/*
Deck.propTypes = {
  deckNow: PropTypes.array.isRequired,
};*/
