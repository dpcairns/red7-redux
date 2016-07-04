import React, { Component, PropTypes } from 'react';
import Card from './Card'

export default class Hand extends Component {
  render() {
    let { myHand, drawOne, deckNow, meldOne, toCanvas } = this.props

    let handNodes = []
    if(myHand.length > 0){
      handNodes = myHand.map( (card,i) => {
      return (
      <div key={card._id}>
        <Card card={card}/>
        <button onClick={toCanvas.bind(this, myHand, deckNow, card)}>canvas</button>
        <br/>
        <button onClick={meldOne.bind(this, myHand, deckNow, card)}>tableau</button>
       </div>
     )
    })
  }
console.table(myHand)
    return (
      <div>
      <h2>Your hand has {myHand.length} cards</h2>
      <div  style={{display:"flex", flexFlow: "row wrap"}}>
            {handNodes}
    </div>
    </div>
    );
  }
}

Hand.propTypes = {
  myHand: PropTypes.array.isRequired,
}
