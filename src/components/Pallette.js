import React, { Component, PropTypes } from 'react';
import Card from './Card'

export default class Pallette extends Component {
  render() {
    let { myTableau } = this.props
    let tableauNodes = []
    if(myTableau.length > 0){
      tableauNodes = myTableau.map( (card,i) => {
      return (
        <div key={card._id}>
        <Card card={card}/>
       </div>
     )
    })
  }

    return (
      <div>
          <h2>Your tableau has {myTableau.length} cards</h2>
            <div  style={{display:"flex", flexFlow: "row wrap"}}>
                  {tableauNodes}
            </div>

      </div>
    );
  }
}

Pallette.propTypes = {
  myTableau: PropTypes.array.isRequired,
}
