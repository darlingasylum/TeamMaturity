import React, { Component, Fragment } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

import "./Board.css";

class Board extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Button
          to="campaign"
          textButton="DEMARRER UNE CAMPAGNE"
          classButton="createButton"
        />
      </Fragment>
    );
  }
}

export default Board;
