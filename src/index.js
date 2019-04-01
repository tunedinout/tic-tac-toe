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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    //calculate winner after every move

    return (
      <div>
        <div className="status">{this.props.status}</div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      isXNext: true
    };
  }
  winner = null;

  handleClick(i) {
    if (this.winner) return;
    if (this.winner !== null) return;
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] !== null) return;
    if (this.state.isXNext) squares[i] = "X";
    else squares[i] = "O";
    var isXNext = !this.state.isXNext;
    //console.log(i);
    this.setState({
      history: history.concat([{ squares }]),
      isXNext: isXNext
    });
  }

  checkWhoWon = sqrs => {
    //check rows

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (var i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (sqrs[a] !== null && sqrs[a] === sqrs[b] && sqrs[b] === sqrs[c]) {
        return sqrs[a];
      }
    }

    return null;
  };

  render() {
    var status = "Next player: " + (this.state.isXNext ? "X" : "O");
    const history = this.state.history;
    const current = history[history.length - 1];
    var winner = this.checkWhoWon(current.squares);

    if (winner !== null) {
      winner = winner === "X" ? "X" : "O";
    }

    if (winner) {
      status = "Winner" + winner;
      this.winner = winner;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            status={status}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
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
