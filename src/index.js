import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true
    };
  }
  winner = null;

  handleClick(i) {
    if (this.winner) return;
    const squares = this.state.squares.slice();

    if (squares[i] != null) return;
    if (this.state.isXNext) squares[i] = "X";
    else squares[i] = "O";
    var isXNext = !this.state.isXNext;
    console.log(i);
    this.setState({ squares: squares, isXNext: isXNext });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  getWinner = (rows, sqrs) => {
    var winner = null;
    for (var i = 0; i < rows.length; i++) {
      var ifAll = true;

      for (var j = 1; j < rows[i].length; j++) {
        if (!ifAll) break;

        if (ifAll && sqrs[rows[i][j]] === sqrs[rows[i][j - 1]]) {
          if (j === rows[i].length - 1) {
            winner = sqrs[rows[i][j]];
          }
        } else {
          ifAll = false;
        }
      }
    }

    return winner;
  };
  checkIfXWon = sqrs => {
    //check rows
    var rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var winner = null;
    var cols = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    var diagonal1 = [0, 4, 8];
    var diagonal2 = [2, 4, 6];

    winner = this.getWinner(rows, sqrs);
    if (winner === "X") return true;
    if (winner === "O") return false;

    winner = this.getWinner(cols, sqrs);
    if (winner === "X") return true;
    if (winner === "O") return false;

    winner =
      sqrs[diagonal1[0]] === sqrs[diagonal1[1]] &&
      sqrs[diagonal1[1]] === sqrs[diagonal1[2]]
        ? sqrs[diagonal1[0]]
        : null;
    if (winner === "X") return true;
    if (winner === "O") return false;

    winner =
      sqrs[diagonal2[0]] === sqrs[diagonal2[1]] &&
      sqrs[diagonal2[1]] === sqrs[diagonal2[2]]
        ? sqrs[diagonal2[0]]
        : null;
    if (winner === "X") return true;
    if (winner === "O") return false;

    return null;

    //check cols

    //check diagonal
  };
  render() {
    var status = "Next player: " + (this.state.isXNext ? "X" : "O");

    var winner = this.checkIfXWon(this.state.squares);

    if (winner !== null) {
      winner = winner === "X" ? "X" : "O";
    }

    if (winner) {
      status = "Winner" + winner;
      this.winner = winner;
    }

    //calculate winner after every move

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
