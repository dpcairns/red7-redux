import React, { Component, PropTypes } from 'react';

export default class Card extends Component {

render(){
    let { card } = this.props
    let cardStyle = {height: "50px", alignItems:"center", width: "30", padding: "5px", margin: "10px", textAlign: "center",
                    color: "white", borderRadius: "5px", border: "solid white 1px", background: card.cardColor}
  return(
      <div style={cardStyle}>
        <h2>{card.cardNumber}</h2>
      </div>
  )
}
}

Card.propTypes = {
};
