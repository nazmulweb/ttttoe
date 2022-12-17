/***********************************************************
Game: Tic Tac Ticky Toe
============================================================
This is a game concept and designed by - Enamul Haque (Moni)

Orignal game of "Tic Tac Toe" is a 2 player 3 X 3 game. 
Here we have developed 3 player 5 X 5 game.
This makes it more exciting and competitive. 
***********************************************************/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



// Squares are buttons which will be clicked to mark.

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


// Board is the total grid that holds the squares and passes values.

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill(null),
      nextp: 0,
    };
  }

// If winner is found stop the game.

  handleClick(i) {
    const squares = this.state.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    let player = this.state.nextp % 3;
    
    if(player === 0)
      squares[i] = 'O';
    else if(player === 1)
      squares[i] = 'X';
    else if(player === 2)
      squares[i] = '\u2713';
    
    this.setState({
      squares: squares,
      nextp: this.state.nextp + 1, 
    });
  }

  renderSquare(i) {
    return(
      <Square 
        value={this.state.squares[i]}
        onClick={ () => this.handleClick(i)} 
      />
    );
  }

// Text for winner and next players.

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    let title = "Tic Tac Ticky Toe"
    let line = "---------------------------------------";
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.nextp % 3);
    }

    return (
      <div>
        <div className="title">{title}</div>
        <div className="line">{line}</div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
        </div>
      </div>
    );
  }
}


// Calculate winner iterates through the grids

function calculateWinner(squares) {
  const original = [0,1,2,5,6,7,10,11,12]; 
  let position = original.slice(); 
  let   winner = null;

  for(let j=0; j<3; j++){
    for(let k=0; k<3; k++){
      for(let t=0; t<position.length; t++)
        position[t] = (j * 5) + position[t] + k;
      winner = findWinner(position, squares);
      if(winner)
        return winner;
      position = original.slice();
    }
  }
  return winner;
}


//findWinner searches for matching lines.

function findWinner(position, squares){
  const n = position.slice();
 
    const lines = [
      [n[0], n[1], n[2]],
      [n[3], n[4], n[5]],
      [n[6], n[7], n[8]],
      [n[0], n[3], n[6]],
      [n[1], n[4], n[7]],
      [n[2], n[5], n[8]],
      [n[0], n[4], n[8]],
      [n[2], n[4], n[6]],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //console.log("Match");
        return squares[a];
      }
    }
    return null;
  }


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
