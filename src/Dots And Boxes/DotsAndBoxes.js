import * as React from "react";
import "./DotsAndBoxes.css";

const INITIAL_STATE = {
  top: "yellow",
  bottom: "yellow",
  left: "yellow",
  right: "yellow",
  cursor: "default",
  width: 200,
  background: "white",
  isPlayer: true
};

export class DotsAndBoxes extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidUpdate(prevState) {
    if (this.state.background !== "white") {
      return;
    }
    if (
      this.state.left !== "yellow" &&
      this.state.right !== "yellow" &&
      this.state.top !== "yellow" &&
      this.state.bottom !== "yellow"
    ) {
      this.setState(oldState => ({
        ...oldState,
        background: prevState.isPlayer ? "red" : "blue"
      }));
    }
  }

  playerHover(evt) {
    const x = evt.nativeEvent.offsetX / this.state.width;
    const y = evt.nativeEvent.offsetY / this.state.width;
    if (x < 0.1 || x > 0.9 || y < 0.1 || y > 0.9) {
      this.setState(oldState => ({
        ...oldState,
        cursor: "pointer"
      }));
    } else {
      this.setState(oldState => ({
        ...oldState,
        cursor: "default"
      }));
    }
  }

  aIClickSquare(evt) {
    const x = evt.nativeEvent.offsetX / this.state.width;
    const y = evt.nativeEvent.offsetY / this.state.width;
    if (
      this.state.left !== "yellow" &&
      this.state.right !== "yellow" &&
      this.state.top !== "yellow" &&
      this.state.bottom !== "yellow"
    ) {
      this.setState(oldState => ({
        ...oldState,
        background: "blue"
      }));
    }
    if (x < 0.1 && this.state.left === "yellow") {
      this.setState(oldState => ({
        ...oldState,
        left: "blue",
        isPlayer: true
      }));
    }
    if (x > 0.9 && this.state.right === "yellow") {
      this.setState(oldState => ({
        ...oldState,
        right: "blue",
        isPlayer: true
      }));
    }
    if (y < 0.1 && this.state.top === "yellow") {
      this.setState(oldState => ({
        ...oldState,
        top: "blue",
        isPlayer: true
      }));
    }
    if (y > 0.9 && this.state.bottom === "yellow") {
      this.setState(oldState => ({
        ...oldState,
        bottom: "blue",
        isPlayer: true
      }));
    }
  }

  clickSquare(evt) {
    const x = evt.nativeEvent.offsetX / this.state.width;
    const y = evt.nativeEvent.offsetY / this.state.width;
    if (this.state.isPlayer) {
      if (x < 0.1 && this.state.left === "yellow") {
        this.setState(oldState => ({
          ...oldState,
          left: "red",
          isPlayer: false
        }));
      }
      if (x > 0.9 && this.state.right === "yellow") {
        this.setState(oldState => ({
          ...oldState,
          right: "red",
          isPlayer: false
        }));
      }
      if (y < 0.1 && this.state.top === "yellow") {
        this.setState(oldState => ({
          ...oldState,
          top: "red",
          isPlayer: false
        }));
      }
      if (y > 0.9 && this.state.bottom === "yellow") {
        this.setState(oldState => ({
          ...oldState,
          bottom: "red",
          isPlayer: false
        }));
      }
    } else {
      this.aIClickSquare(evt);
    }
  }

  render() {
    return (
      <div
        className="dots-and-boxes__square"
        style={{
          borderTopColor: this.state.top,
          borderBottomColor: this.state.bottom,
          borderLeftColor: this.state.left,
          borderRightColor: this.state.right,
          cursor: this.state.cursor,
          width: this.state.width,
          height: this.state.width,
          marginTop: -this.state.width / 2,
          marginLeft: -this.state.width / 2,
          background: this.state.background
        }}
        onClick={evt => this.clickSquare(evt)}
        onMouseMove={evt => this.playerHover(evt)}
      ></div>
    );
  }
}
