import * as React from "react";
import "./DotsAndBoxes1.css";
import CounterInput from "react-counter-input";


const NEUTRAL_GRADIENT = "linear-gradient(to bottom right, #f2f2f2, #595959)";
const PLAYER_GRADIENT = "linear-gradient(to bottom right, orange, red)";
const OPPONENT_GRADIENT = "linear-gradient(to bottom right, #cce6ff, #004d99)";

const NEUTRAL_BORDER = "#ffff80";
const PLAYER_BORDER = "#e62e00";
const OPPONENT_BORDER = "#001a66";

const INITIAL_CELL_STATE = {
    top: NEUTRAL_BORDER,
    bottom: NEUTRAL_BORDER,
    left: NEUTRAL_BORDER,
    right: NEUTRAL_BORDER, 
    cursor: "default",
    background: NEUTRAL_GRADIENT,
};

function generateGrid(rowNum) {
  return [...Array(rowNum)].map(() => [...Array(rowNum)].map(() => INITIAL_CELL_STATE));
}

function generateWidth(rowNum) {
  return `${100 / rowNum}%`;
}

const INITIAL_STATE = (rowNum) => ({
    //grid: [[INITIAL_CELL_STATE,INITIAL_CELL_STATE,INITIAL_CELL_STATE], [INITIAL_CELL_STATE,INITIAL_CELL_STATE,INITIAL_CELL_STATE], [INITIAL_CELL_STATE,INITIAL_CELL_STATE,INITIAL_CELL_STATE]],
    width: generateWidth(rowNum),
    isPlayer: true,
    isGameOver: false,
    rowNum,
    didPlayerWin: true,
    grid: generateGrid(rowNum),
});

export class DotsAndBoxes1 extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE(5);
  }

  simpleAI() {
    const grid = this.deepCopy(this.state.grid);
    const color = OPPONENT_BORDER;
    while (true) {
      const i = Math.floor(Math.random() * grid.length);
      const j = Math.floor(Math.random() * grid[i].length);
      const border = Math.floor(Math.random() * grid.length);
      switch(border) {
        case 0:
          if (grid[i][j].left === NEUTRAL_BORDER) {
            if (j-1 >= 0) {
              grid[i][j-1].right = color;
            }
            grid[i][j].left = color;
            this.setState(oldState => ({
                ...oldState,
                grid,
                isPlayer: !this.state.isPlayer,
            }));
            return;
          }
          break;
        case 1:
          if (grid[i][j].right === NEUTRAL_BORDER) {
            if (j+1 < grid.length) {
              grid[i][j+1].left = color;
            }
            grid[i][j].right = color;
            this.setState(oldState => ({
                ...oldState,
                grid,
                isPlayer: !this.state.isPlayer,
            }));
            return;
          }
          break;
        case 2:
          if (grid[i][j].top === NEUTRAL_BORDER) {
            if (i-1 >= 0) {
              grid[i-1][j].bottom = color;
            }
            grid[i][j].top = color;
            this.setState(oldState => ({
                ...oldState,
                grid,
                isPlayer: !this.state.isPlayer,
            }));
            return;
          }
          break;
        case 3:
          if (grid[i][j].bottom === NEUTRAL_BORDER) {
            if (i+1 < grid.length) {
              grid[i+1][j].top = color;
            }
            grid[i][j].bottom = color;
            this.setState(oldState => ({
                ...oldState,
                grid,
                isPlayer: !this.state.isPlayer,
            }));
            return;
          }
          break;
      }
    }
  }

  winningMove() {
    if (this.state.isGameOver) {
      return;
    }
    const grid = this.deepCopy(this.state.grid);
    const color = OPPONENT_BORDER;
    const cells = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].background !== NEUTRAL_GRADIENT) {
          continue;
        }
        const borders = ["left", "right", "top", "bottom"];
        const newArr = borders.map(border => ({side: border, color: grid[i][j][border]}));
        const result = newArr.filter(border => border.color === NEUTRAL_BORDER);
        if (result.length === 1) {
          const side = result[0].side;
          cells.push({i, j, side});
        }
      }
    }
    if (cells.length > 0) {
      const {i, j, side} = cells[Math.floor(Math.random() * cells.length)];
      grid[i][j][side] = color;
      switch (side) {
        case "left":
          if (j-1 >= 0) {
           grid[i][j-1].right = color;
          }
          break;
        case "right":
          if (j+1 < grid.length) {
            grid[i][j+1].left = color;
          }
          break;
        case "top":
          if (i-1 >= 0) {
            grid[i-1][j].bottom = color;
          }
          break;
        case "bottom":
          if (i+1 < grid.length) {
            grid[i+1][j].top = color;
          }
          break;
      }
      this.setState(oldState => ({
        ...oldState,
        grid,
        isPlayer: !this.state.isPlayer,
      }));
    } else {
      this.losingMove();
    }
  }

  isBorderOKToClick(border, i, j) {
    if (this.state.grid[i][j][border] !== NEUTRAL_BORDER) {
      return false;
    }
    const borders = ["left", "right", "top", "bottom"];
    let yellowBorders = borders.filter(bord => this.state.grid[i][j][bord] === NEUTRAL_BORDER).length;
    if (yellowBorders <= 2) {
      return false;
    }
    switch (border) {
      case "left":
        // count up non-yellow borders in current square and in square to its left
        if (j-1 >= 0) {
          yellowBorders = borders.filter(bord => this.state.grid[i][j-1][bord] === NEUTRAL_BORDER).length;
          if (yellowBorders <= 2) {
            return false;
          }
        }
        break;
      case "right":
        // count up non-yellow borders in current square and in square to its right
        if (j+1 < this.state.grid.length) {
          yellowBorders = borders.filter(bord => this.state.grid[i][j+1][bord] === NEUTRAL_BORDER).length;
          if (yellowBorders <= 2) {
            return false;
          }
        }
        break;
      case "top":
        // count up non-yellow borders in current square and in square to its top
        if (i-1 >= 0) {
          yellowBorders = borders.filter(bord => this.state.grid[i-1][j][bord] === NEUTRAL_BORDER).length;
          if (yellowBorders <= 2) {
            return false;
          }
        }
        break;
      case "bottom":
        // count up non-yellow borders in current square and in square to its bottom
        if (i+1 < this.state.grid.length) {
          yellowBorders = borders.filter(bord => this.state.grid[i+1][j][bord] === NEUTRAL_BORDER).length;
          if (yellowBorders <= 2) {
            return false;
          }
        }
        break;
    }
    return true;
  }

  losingMove() {
    const grid = this.deepCopy(this.state.grid);
    const color = OPPONENT_BORDER;
    const cells = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].background !== NEUTRAL_GRADIENT) {
          continue;
        }
        const borders = ["left", "right", "top", "bottom"];
        const clickableBorders = borders.filter(border => this.isBorderOKToClick(border, i, j));
        clickableBorders.forEach(side => cells.push({i, j, side}));
      }
    }
    if (cells.length > 0) {
      const {i, j, side} = cells[Math.floor(Math.random() * cells.length)];
      grid[i][j][side] = color;
      switch (side) {
        case "left":
          if (j-1 >= 0) {
           grid[i][j-1].right = color;
          }
          break;
        case "right":
          if (j+1 < grid.length) {
            grid[i][j+1].left = color;
          }
          break;
        case "top":
          if (i-1 >= 0) {
            grid[i-1][j].bottom = color;
          }
          break;
        case "bottom":
          if (i+1 < grid.length) {
            grid[i+1][j].top = color;
          }
          break;
      }
      this.setState(oldState => ({
        ...oldState,
        grid,
        isPlayer: !this.state.isPlayer,
      }));
    } else {
      this.simpleAI();
    }
  }

  checkIfGameIsOver() {
    const grid = this.deepCopy(this.state.grid);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].background === NEUTRAL_GRADIENT) {
          return false;
        }
      }
    }
    return true;
  }

  cellDidUpdate(grid, cell, i , j, prevState) {
    if (cell.background !== NEUTRAL_GRADIENT) {
      return false;
    }
    if (cell.left !== NEUTRAL_BORDER && cell.right !== NEUTRAL_BORDER && cell.top !== NEUTRAL_BORDER && cell.bottom !== NEUTRAL_BORDER) {
      grid[i][j].background = prevState.isPlayer ? PLAYER_GRADIENT : OPPONENT_GRADIENT;
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) === JSON.stringify(this.state)) {
      return;
    }
    if (this.checkIfGameIsOver()) {
      this.setState(oldState => ({
        ...oldState,
        isGameOver: true,
      }));
      setTimeout(() => {
        this.setState(INITIAL_STATE(this.state.rowNum));
      },1000);
      return;
    }
    const grid = this.deepCopy(this.state.grid);
    let isPlayer = this.state.isPlayer;
    let didAnyCellUpdate = false;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (this.cellDidUpdate(grid, grid[i][j], i, j, prevState)) {
            didAnyCellUpdate = true;
          } 
        }
    }
    if (didAnyCellUpdate) {
      isPlayer = !isPlayer;
    }
    if (!isPlayer && !didAnyCellUpdate) {
      setTimeout(() => {
        this.winningMove();
      },1000);
    }
    this.setState(oldState => ({
      ...oldState,
      isPlayer,
      grid,
    }));
  }
  
  deepCopy(grid) {
    return grid.map(row => row.map(cell => ({...cell})));
  }

  playerHover(evt, cell, i, j) {
    if (!this.state.isPlayer) {
      return;
    }
    const dataId = evt.currentTarget.dataset.id;
    const width = document.querySelector(`div[data-id="${dataId}"]`).getBoundingClientRect().width;
    const x = evt.nativeEvent.offsetX / width;
    const y = evt.nativeEvent.offsetY / width;
    if (x < 0.1 && cell.left === NEUTRAL_BORDER) {
      const grid = this.deepCopy(this.state.grid);
      grid[i][j].cursor = "pointer";
      this.setState(oldState => ({
          ...oldState,
          grid,
      }));
    } else if (x > 0.9 && cell.right === NEUTRAL_BORDER) {
        const grid = this.deepCopy(this.state.grid);
        grid[i][j].cursor = "pointer";
        this.setState(oldState => ({
          ...oldState,
          grid,
      }));
    } else if (y < 0.1 && cell.top === NEUTRAL_BORDER) {
        const grid = this.deepCopy(this.state.grid);
        grid[i][j].cursor = "pointer";
        this.setState(oldState => ({
          ...oldState,
          grid,
        }));
    } else if (y > 0.9 && cell.bottom === NEUTRAL_BORDER) {
        const grid = this.deepCopy(this.state.grid);
        grid[i][j].cursor = "pointer";
        this.setState(oldState => ({
          ...oldState,
          grid,
        }));
    } else {
        const grid = this.deepCopy(this.state.grid);
        grid[i][j].cursor = "default";
        this.setState(oldState => ({
          ...oldState,
          grid,
        }));
    }
  }

  clickSquare(evt, cell, i, j) {
    if (!this.state.isPlayer) {
      return;
    }
    const dataId = evt.currentTarget.dataset.id;
    const width = document.querySelector(`div[data-id="${dataId}"]`).getBoundingClientRect().width;
    const x = evt.nativeEvent.offsetX / width;
    const y = evt.nativeEvent.offsetY / width;
    const color = PLAYER_BORDER;
    if (x < 0.1 && cell.left === NEUTRAL_BORDER) {
        const grid = this.deepCopy(this.state.grid);
        if (j-1 >= 0) {
          grid[i][j-1].right = color;
        }
        grid[i][j].left = color;
        this.setState(oldState => ({
            ...oldState,
            grid,
            isPlayer: !this.state.isPlayer,
        }));
    } else if (x > 0.9 && cell.right === NEUTRAL_BORDER) {
        const grid = this.deepCopy(this.state.grid);
        if (j+1 < grid.length) {
          grid[i][j+1].left = color;
        }
        grid[i][j].right = color;
        this.setState(oldState => ({
            ...oldState,
            grid,
            isPlayer: !this.state.isPlayer,
        }));
    } else if (y < 0.1 && cell.top === NEUTRAL_BORDER) {
        const grid = this.deepCopy(this.state.grid);
        if (i-1 >= 0) {
          grid[i-1][j].bottom = color;
        }
        grid[i][j].top = color;
        this.setState(oldState => ({
            ...oldState,
            grid,
            isPlayer: !this.state.isPlayer,
        }));
    } else if (y > 0.9 && cell.bottom === NEUTRAL_BORDER) {
        const grid = this.deepCopy(this.state.grid);
        if (i+1 < grid.length) {
          grid[i+1][j].top = color;
        }
        grid[i][j].bottom = color;
        this.setState(oldState => ({
            ...oldState,
            grid,
            isPlayer: !this.state.isPlayer,
        }));
    }
  }

  render() {
    return (
      <div className="dots-and-boxes__background">
        <p className="dots-and-boxes__counter">
          Select below number of rows
        </p>
        <CounterInput
          count={5}
          min={3}
          max={15}
          onCountChange={count => {
            this.setState(INITIAL_STATE(count));
          }}
          inputStyle={{background: "white", height: "30px", width: "80px"}}
          wrapperStyle={{justifyContent: "center", marginBottom: "50px"}}
          btnStyle={{color: "white", fontSize: "24px"}}
        />
        <div className="dots-and-boxes__game">
        {this.state.grid.map((row, i) => (
          <div className="dots-and-boxes__row" key={i}>
            {row.map((cell, j) => (
              <div className="dots-and-boxes__aspect-ratio" style={{width: this.state.width}} key={j}>
                <div className="dots-and-boxes__square" data-id={`${i},${j}`} style={{borderTopColor: cell.top, borderBottomColor: cell.bottom, borderLeftColor: cell.left, borderRightColor: cell.right, cursor: cell.cursor, backgroundImage: cell.background}} onClick={(evt) => this.clickSquare(evt, cell, i, j)} onMouseMove={(evt) => this.playerHover(evt, cell, i, j)} />
              </div>
            ))}
          </div>
        ))}
        </div>
        {
          // Render gameOver and display message who won
        }
      </div>
    );
  }
}

