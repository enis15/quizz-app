import React, { Component } from "react";
import Data from "./Data";
import "./Game.css";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      question: Data[0].question,
      answer: false,
      totalScored: 0,
      maxNr: 9,
      gameOver: false,
    };
    this.loadData = this.loadData.bind(this);
    this.handleSakteButton = this.handleSakteButton.bind(this);
    this.handlePasakteButton = this.handlePasakteButton.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  loadData() {
    this.incrementIndex();
    this.setState(() => {
      return {
        question: Data[this.state.index + 1].question,
        answer: Data[this.state.index + 1].answer,
      };
    });
  }

  incrementIndex() {
    this.setState(() => {
      return {
        index: this.state.index + 1,
      };
    });
  }

  handleSakteButton() {
    if (Data[this.state.index].answer) {
      this.setState(() => {
        return {
          totalScored: this.state.totalScored + 1,
        };
      });
    }

    if (this.gameIsOver(this.state.index)) {
      alert("Game is Over!");
      return;
    }

    this.loadData();
  }

  handlePasakteButton() {
    if (this.gameIsOver(this.state.index)) {
      alert("Game is Over!");
      return;
    }
    this.loadData();
    if (!Data[this.state.index].answer) {
      this.setState(() => {
        return {
          totalScored: this.state.totalScored + 1,
        };
      });
    }
  }

  gameIsOver(idx) {
    if (idx === this.state.maxNr) {
      this.setState(() => {
        return {
          gameOver: true,
        };
      });
      return true;
    }
    ///
    return false;
  }

  resetState() {
    this.setState(() => {
      return {
        index: 0,
        question: Data[0].question,
        answer: false,
        totalScored: 0,
        gameOver: false,
      };
    });
  }

  render() {
    const Track = styled.div`
      margin-top: 10%;
      width: 100%;
      height: 20px;
      background-color: #353b48;
      border-radius: 10px;
      box-shadow: inset 0 0 5px #000;
    `;

    const Thumb = styled.div`
      float: left;
      width: ${(props) => props.percentage}%;
      height: 100%;
      background-color: #2ecc71;
      border-radius: 8px;
    `;

    return (
      <div className="Game">
        <center>
          <h3>Question {this.state.index + 1}</h3>
          <h2>{this.state.question}</h2>
          <Button
            disabled={this.state.gameOver}
            onClick={this.handleSakteButton}
            className="button1 buttons"
            variant="success"
          >
            Correct
          </Button>
          <Button
            disabled={this.state.gameOver}
            onClick={this.handlePasakteButton}
            className="button2 buttons"
            variant="danger"
          >
            Incorrect
          </Button>{" "}
          <div className="total-div">
            <h3 className="total">Total : {this.state.totalScored}</h3>
            <Button
              onClick={this.resetState}
              className="restart"
              variant="warning"
            >
              Restart
            </Button>{" "}
          </div>
          <Track>
            <Thumb percentage={this.state.totalScored * 10} />
          </Track>
        </center>
      </div>
    );
  }
}

export default Game;
