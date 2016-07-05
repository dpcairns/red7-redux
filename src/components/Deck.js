import React, { Component, PropTypes } from 'react';
import Card from './Card'
import Hand from './Hand'
import Canvas from './Canvas'
import Pallette from './Pallette'
import ReactInterval from 'react-interval';

export default class Deck extends Component {
    componentWillMount(){
      this.props.clearHand()

    }

    checkWinning(){

      let myHighestCard = 0
        this.props.myTableau.forEach( (card, i) => {
          if(card.cardNumber !== undefined && card.cardNumber > myHighestCard){
            myHighestCard = card.cardNumber
          }
        })
        let yourHighestCard = 0
        this.props.yourTableau.forEach( (card,i) => {
          if(card.cardNumber !== undefined && card.cardNumber > yourHighestCard){
            yourHighestCard = card.cardNumber
          }
        })

        if (myHighestCard > yourHighestCard){
          this.props.iAmWinning()
          this.props.youAreLosing()
        }
        if (myHighestCard < yourHighestCard){
          this.props.iAmLosing()
          this.props.youAreWinning()
        }


    }


  render() {
    let { iAmLosing, iAmWinning, youAreLosing, youAreWinning, deckNow, meldOne, myHand, newGame, canvasNow, toCanvas, youMeldOne, youDrawOne, youToCanvas,
      toggleNewGame, myTableau, clearHand, drawOne, yourHand, yourTableau, changeRules, myStatus, yourStatus, newTurn,
      colorArray, togglePlaying, playing, setup, checkWinning } = this.props

      if(newGame===true){
                    if(myHand.length <= 5){
                    drawOne(myHand, deckNow)
                    }
                    else if(myHand.length >= 5 && yourHand.length <= 5){
                    youDrawOne(yourHand, deckNow)
                    } else {
                    toggleNewGame()
                    }
              }
    return (

      <div style={{textAlign: "center"}}>
      <ReactInterval timeout={200} enabled={true}
       callback={() => this.checkWinning() } />
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

          <div style={{width:"45%", float: "left", background: myStatus.turn ? 'lightgreen' : '', border: "1px solid black", margin: "10px"}}>
                ME
                    <Hand meldOne={meldOne} checkWinning={this.checkWinning.bind(this)} myStatus={myStatus} toCanvas={toCanvas} deckNow={deckNow} myHand={myHand} drawOne={drawOne} />
                    <hr/>
                    {myStatus.winning ? "you are winning the game" : "you are losing the game"}
                    <button style={{display: myStatus.turn ? 'block' : 'none'}} onClick={newTurn.bind(this)}> pass turn </button>
                    <Pallette myTableau={myTableau} />
            </div>

            <div style={{width:"45%", float: "left", background: yourStatus.turn ? 'lightgreen' : '', border: "1px solid black", margin: "10px"}}>
            YOU
                      <Hand meldOne={youMeldOne} checkWinning={this.checkWinning.bind(this)} yourStatus={yourStatus} toCanvas={youToCanvas} deckNow={deckNow} myHand={yourHand} drawOne={youDrawOne} />
                      <hr/>
                      {yourStatus.winning ? "you are winning the game" : "you are losing the game"}
                      <button style={{display: yourStatus.turn ? 'block' : 'none'}} onClick={newTurn.bind(this)}> pass turn </button>

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
