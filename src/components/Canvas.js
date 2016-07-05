import React, { Component, PropTypes } from 'react';
import Card from './Card'
export default class Canvas extends Component {
  render() {
    let { canvasNow, changeRules, playing } = this.props
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

    if(canvasNow.length > 0){
          switch(canvasNow[canvasNow.length - 1].cardColor) {
          case 'red':
             changeRules("highest card wins")
             break
          case 'orange':
             changeRules("most of one number wins")
             break
          case 'yellow':
             changeRules("most of one color wins")
             break
          case 'green':
              changeRules("most even cards wins")
              break
          case 'blue':
              changeRules("most different colors wins")
              break
          case 'indigo':
               changeRules("longest run (cards in sequence) wins")
               break
          case 'violet':
               changeRules("most cards below 4 wins")
               break

          default:
                changeRules("highest card wins")
                break

            }
        }
    return (
      <div>
          <h2>The current rule is: {playing}</h2>
            <div style={{display: "flex", justifyContent: "center"}}>
                  {canvasNodes[canvasNodes.length - 1]}

            </div>

      </div>
    );
  }
}

Canvas.propTypes = {
};
