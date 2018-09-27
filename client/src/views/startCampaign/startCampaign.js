import React, { Fragment } from "react";
import Header from "../../components/Header/Header";

class Name extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <p>Coucou je démarre une campagne</p>
      </Fragment>
    );
  }
}

export default Name;
