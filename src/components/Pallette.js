import React, { Component } from 'react';
import Card from './Card'

export default class Pallette extends Component {
  render() {
    let { palletteList } = this.props
    let palletteNodes = palletteList.map( (card,i) => {
      return (<div key={Date.now() + i}>
        <Card cardColor={card.cardColor} cardNumber={card.cardNumber}/>
       </div>)
    })
    return (
    <div>
      {palletteNodes}
    </div>
    );
  }
}

Canvas.propTypes = {
  palletteList: PropTypes.array.isRequired,
}
