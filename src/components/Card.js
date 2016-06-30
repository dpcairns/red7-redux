import React, { Component, PropTypes } from 'react';

export default class Card extends Component {

render(){
    let { cardNumber, cardColor } = this.props
    let cardStyle = {height: "150px", alignItems:"center", width: "100px", margin: "10px", textAlign: "center", color: "white", borderRadius: "15px", border: "solid white 1px", background: cardColor}
  return(
      <div style={cardStyle}>
        <h1>{cardNumber}</h1>
      </div>
  )
}
}

Card.propTypes = {
    cardNumber: React.PropTypes.number.isRequired,
    cardColor: React.PropTypes.string.isRequired,
};
