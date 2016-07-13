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
        switch (this.props.playing) {
        case "highest card wins":
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
                break
        case "most of one number wins":
                  let myCounts = {};
                  this.props.myTableau.forEach( (card, i) => {
                    myCounts[card.cardNumber] = (myCounts[card.cardNumber] || 0)+1
                        })
                  let yourCounts = {};
                    this.props.yourTableau.forEach( (card, i) => {
                    yourCounts[card.cardNumber] = (yourCounts[card.cardNumber] || 0)+1
                              })

                  let myHighestCount = 0
                  let yourHighestCount = 0

                  for(let prop in myCounts){
                    if(myCounts[prop] > myHighestCount){
                      myHighestCount = myCounts[prop]
                    }
                  }

                  for(let prop in yourCounts){
                    if(yourCounts[prop] > yourHighestCount){
                      yourHighestCount = yourCounts[prop]
                    }
                  }
                if (myHighestCount > yourHighestCount){
                  this.props.iAmWinning()
                  this.props.youAreLosing()
                        }
                if (myHighestCount< yourHighestCount){
                  this.props.iAmLosing()
                  this.props.youAreWinning()
                        }
                break

                case "most of one color wins":
                  let myColorCounts = {};
                  this.props.myTableau.forEach( (card, i) => {
                    myColorCounts[card.cardColor] = (myColorCounts[card.cardColor] || 0)+1
                        })
                  let yourColorCounts = {};
                    this.props.yourTableau.forEach( (card, i) => {
                    yourColorCounts[card.cardColor] = (yourColorCounts[card.cardColor] || 0)+1
                              })

                  let myHighestColorCount = 0
                  let yourHighestColorCount = 0

                  for(let prop in myColorCounts){
                    if(myColorCounts[prop] > myHighestColorCount){
                      myHighestColorCount = myColorCounts[prop]
                    }
                  }

                  for(let prop in yourColorCounts){
                    if(yourColorCounts[prop] > yourHighestColorCount){
                      yourHighestColorCount = yourColorCounts[prop]
                    }
                  }
                if (myHighestColorCount > yourHighestColorCount){
                  this.props.iAmWinning()
                  this.props.youAreLosing()
                        }
                if (myHighestColorCount< yourHighestColorCount){
                  this.props.iAmLosing()
                  this.props.youAreWinning()
                        }
                break
                case "most even cards wins":
                  let myEvenCounts = 0;
                  this.props.myTableau.forEach( (card, i) => {
                    if(card.isEven){
                      myEvenCounts++
                    }
                        })
                  let yourEvenCounts = 0;
                      this.props.yourTableau.forEach( (card, i) => {
                        if(card.isEven){
                          yourEvenCounts++
                        }
                              })

                if (myEvenCounts > yourEvenCounts){
                  this.props.iAmWinning()
                  this.props.youAreLosing()
                        }
                if (myEvenCounts< yourEvenCounts){
                  this.props.iAmLosing()
                  this.props.youAreWinning()
                        }
                break
                case "most cards below 4 wins":
                  let myLowCounts = 0;
                  this.props.myTableau.forEach( (card, i) => {
                    if(card.isBelowFour){
                      myLowCounts++
                    }
                        })
                  let yourLowCounts = 0;
                      this.props.yourTableau.forEach( (card, i) => {
                        if(card.isBelowFour){
                          yourLowCounts++
                        }
                              })

                if (myLowCounts > yourLowCounts){
                  this.props.iAmWinning()
                  this.props.youAreLosing()
                        }
                if (myLowCounts< yourLowCounts){
                  this.props.iAmLosing()
                  this.props.youAreWinning()
                        }
                break
                case "most different colors wins":
                  let myDistinctColors = [];
                  let yourDistinctColors = []
                  this.props.myTableau.forEach( (card, i) => {
                    if(myDistinctColors.indexOf(card.cardColor) < 0){
                      myDistinctColors.push(card.cardColor)
                    }
                        })


                  this.props.yourTableau.forEach( (card, i) => {
                    if(yourDistinctColors.indexOf(card.cardColor) < 0){
                      yourDistinctColors.push(card.cardColor)
                        }
                          })
               if (myDistinctColors.length > yourDistinctColors.length){
                  this.props.iAmWinning()
                  this.props.youAreLosing()
                        }
                if (myDistinctColors.length < yourDistinctColors.length){
                  this.props.iAmLosing()
                  this.props.youAreWinning()
                        }
                break
                case "longest run (cards in sequence) wins":
                  let myLongestRun = 1;
                  let yourLongestRun = 0
                  let mySingletons = []
                  let yourSingletons = []
                  let myCurrentStreak = 0
                  let yourCurrentStreak = 0
                  this.props.myTableau.forEach( (card, i) => {
                    if(mySingletons.indexOf(card.cardNumber < 0)){
                      mySingletons.push(card.cardNumber)
                    }
                  })


                  mySingletons = mySingletons.filter(function(elem, pos,arr) {
                              return arr.indexOf(elem) == pos;
                            });

                  mySingletons.sort(function(a, b){return a-b});

                  mySingletons.forEach( (d, i) => {
                    if (d != mySingletons[i - 1] + 1){
                      if(myCurrentStreak > myLongestRun){
                        myLongestRun = myCurrentStreak
                      }
                      myCurrentStreak = 0
                    }
                    myCurrentStreak++
                  })


                  console.table(mySingletons)
                  this.props.yourTableau.forEach( (card, i) => {
                    if(yourSingletons.indexOf(card.cardNumber < 0)){
                      yourSingletons.push(card.cardNumber)
                      }
                          })

                yourSingletons = yourSingletons.filter(function(elem, pos,arr) {
                            return arr.indexOf(elem) == pos;
                          });


                  yourSingletons.sort(function(a, b){return a-b});

                  console.table(yourSingletons)
                        yourSingletons.forEach( (d, i) => {
                          if (d != yourSingletons[i - 1] + 1){
                            if(yourCurrentStreak > yourLongestRun){
                              yourLongestRun = yourCurrentStreak
                            }
                            yourCurrentStreak = 0
                          }
                          yourCurrentStreak++
                        })


                if (myLongestRun > yourLongestRun){
                  this.props.iAmWinning()
                  this.props.youAreLosing()
                        }
                if (myLongestRun < yourLongestRun){
                  this.props.iAmLosing()
                  this.props.youAreWinning()
                        }
                break
          default:
            break;
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
      <ReactInterval timeout={400} enabled={true}
       callback={() => this.checkWinning() } />
              <button onClick={ () => {clearHand(); changeRules("highest card wins"); iAmLosing(); youAreLosing(); toggleNewGame()} }>
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
