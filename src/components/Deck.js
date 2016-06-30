import React, { Component, PropTypes } from 'react';
import Card from './Card'

export default class Deck extends Component {

  render() {
    let { deckNow, meldOne, myHand, myTableau, clearHand, drawOne, colorArray, togglePlaying, playing } = this.props

      let handNodes = []
      if(myHand.length > 0){
        handNodes = myHand.map( (card,i) => {
        return (
          <div onClick={meldOne.bind(this, myHand, deckNow, card)} key={card._id}>
          <Card cardColor={card.cardColor} cardNumber={card.cardNumber}/>
         </div>
       )
      })
    }


          let tableauNodes = []
          if(myTableau.length > 0){
            tableauNodes = myTableau.map( (card,i) => {
            return (
              <div key={card._id}>
              <Card cardColor={card.cardColor} cardNumber={card.cardNumber}/>
             </div>
           )
          })
        }


    if(myHand.length < 6 && playing === true){
      drawOne(myHand, deckNow)
    }

    return (
      <div style={{textAlign: "center"}}>
      <button onClick={clearHand.bind(this)}>
      <span onClick={togglePlaying.bind(this)}>{myHand.length === 0 ? "New game" : "End game"}</span>
      </button>
      <button onClick={deckNow.length > 0 ? drawOne.bind(this, myHand, deckNow) : clearHand.bind(this)}>Draw a card</button>

        (the deck has {deckNow.length} cards.)
        <h2>Your hand has {myHand.length} cards</h2>
        <div  style={{display:"flex", flexFlow: "row wrap"}}>
              {handNodes}
      </div>
      <hr/>
      <h2>Your tableau has {myTableau.length} cards</h2>
      <div  style={{display:"flex", flexFlow: "row wrap"}}>
              {tableauNodes}
    </div>
      </div>
    )
  }
}


Deck.propTypes = {
  deckNow: PropTypes.array.isRequired,
};
