import React, { Component, Fragment } from "react";
import Header from "../../components/Header/Header";

class Board extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <p>Coucou je suis le board</p>
      </Fragment>
    );
  }
}

export default Board;
