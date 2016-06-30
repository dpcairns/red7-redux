import React, { Component, PropTypes } from 'react';
import Card from './Card'

export default class Hand extends Component {
  render() {
    let { myHand, drawOne, deckNow, setup, toggleSetup } = this.props


    let handNodes = []
    if(myHand !== undefined && myHand.length > 0){myHand.map( (card,i) => {
      return (<div key={Date.now() + i}>
        <Card cardColor={card.cardColor} cardNumber={card.cardNumber}/>
       </div>)
    })
  }

    return (
    <div>
      <h2>My Hand</h2>
      {handNodes}
    </div>
    );
  }
}

Hand.propTypes = {
  myHand: PropTypes.array.isRequired,
}
