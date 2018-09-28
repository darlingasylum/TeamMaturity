import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";

class Name extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <p>Coucou je démarre une campagne</p>
        <Question />
      </Fragment>
    );
  }
}

export default Name;
