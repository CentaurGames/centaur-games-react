import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";
import "./TicTacToe.css";

const INITIAL_STATE = {
  grid: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  isPlayer: true,
  isGameOver: false
};

export class TicTacToe extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  testRow(row) {
    const result = row.filter(ele => ele === row[0] && ele !== "");
    return result.length === row.length;
  }

  checkIfGameIsOver(grid) {
    for (let i = 0; i < grid.length; i++) {
      if (this.testRow(grid[i])) {
        return true;
      }
      if (this.testRow(grid.map(row => row[i]))) {
        return true;
      }
    }
    const diaArray = [];
    for (let j = 0; j < grid.length; j++) {
      diaArray.push(grid[j][j]);
    }
    if (this.testRow(diaArray)) {
      return true;
    }
    const antiDiaArray = [];
    for (let j = 0; j < grid.length; j++) {
      antiDiaArray.push(grid[j][grid.length - j - 1]);
    }
    if (this.testRow(antiDiaArray)) {
      return true;
    }
    return this.isGameADraw(grid);
  }

  isGameADraw(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  }

  randomMove(grid) {
    let i = 0;
    let j = 0;
    while (grid[i][j] !== "") {
      i = Math.floor(Math.random() * grid.length);
      j = Math.floor(Math.random() * grid.length);
    }
    const newGrid = this.deepCopy(grid);
    newGrid[i][j] = "O";
    this.setState(oldState => ({
      ...oldState,
      grid: this.deepCopy(newGrid),
      isPlayer: true
    }));
  }

  winningMove(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== "") {
          continue;
        }
        const newGrid = this.deepCopy(grid);
        newGrid[i][j] = "O";
        if (this.checkIfGameIsOver(newGrid)) {
          newGrid[i][j] = "O";
          this.setState(oldState => ({
            ...oldState,
            grid: this.deepCopy(newGrid),
            isPlayer: true,
            isGameOver: true
          }));
          setTimeout(() => {
            this.setState(INITIAL_STATE);
          }, 1000);
          return;
        }
      }
    }
    this.blockingMove(grid);
  }

  blockingMove(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== "") {
          continue;
        }
        const newGrid = this.deepCopy(grid);
        newGrid[i][j] = "X";
        if (this.checkIfGameIsOver(newGrid)) {
          newGrid[i][j] = "O";
          this.setState(oldState => ({
            ...oldState,
            grid: this.deepCopy(newGrid),
            isPlayer: true
          }));
          return;
        }
      }
    }
    this.randomMove(grid);
  }

  player1Click(i, j) {
    const newGrid = this.deepCopy(this.state.grid);
    if (newGrid[i][j] === "" && this.state.isPlayer && !this.state.isGameOver) {
      newGrid[i][j] = "X";
    } else {
      return;
    }
    this.setState(oldState => ({
      ...oldState,
      grid: newGrid,
      isPlayer: false
    }));
    if (this.checkIfGameIsOver(newGrid)) {
      this.setState(oldState => ({
        ...oldState,
        isGameOver: true
      }));
      setTimeout(() => {
        this.setState(INITIAL_STATE);
      }, 1000);
      return;
    }
    setTimeout(() => {
      this.winningMove(newGrid);
    }, 300);
  }

  deepCopy(grid) {
    return grid.map(row => [...row]);
  }

  convertCellToIcon(cell) {
    switch (cell) {
      case "":
        return null;
      case "X":
        return <FontAwesomeIcon icon={faTimes} />;
      case "O":
        return <div className="tic-tac-toe__o" />;
    }
  }

  render() {
    return (
      <div className="tic-tac-toe__grid">
        {this.state.grid.map((row, i) => (
          <div className="tic-tac-toe__row" key={i}>
            {row.map((cell, j) => (
              <div
                className="tic-tac-toe__square"
                key={j}
                onClick={() => this.player1Click(i, j)}
              >
                {this.convertCellToIcon(cell)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
