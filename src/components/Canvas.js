import React, { Component, PropTypes } from 'react';
import Card from './Card'
export default class Canvas extends Component {
  render() {
    let { canvasNow } = this.props
    let canvasNodes = []
    if(canvasNow.length > 0){
      canvasNodes = canvasNow.map( (card,i) => {
      return (
        <div key={card._id}>
        <Card card={card}/>
       </div>
     )
    })
  }

    let currentRule = "highest card wins"
    if(canvasNow.length > 0){
          switch(canvasNow[canvasNow.length - 1]['cardColor']) {
          case 'red':
             currentRule = "highest card wins"
          case 'orange':
             currentRule = "most of one number wins"
          case 'yellow':
             currentRule = "most of one color wins"
          case 'green':
              currentRule = "most even cards wins"
          case 'blue':
              currentRule = "most different colors wins"
          case 'indigo':
               currentRule = "longest run (cards in sequence) wins"
          case 'violet':
               currentRule = "most cards below 4 wins"
          default:
                currentRule = "highest card wins"
            }
        }
    return (
      <div>
          <h2>The current rule is: {currentRule}</h2>
            <div>
                  {canvasNodes[canvasNodes.length - 1]}

            </div>

      </div>
    );
  }
}

Canvas.propTypes = {
};
