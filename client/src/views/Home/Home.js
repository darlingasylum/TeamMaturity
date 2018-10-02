import React, { Component, Fragment } from "react";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";

import "./Home.css";

class Home extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(response => {
        // console.log(response);
        this.setState({ response });
        // console.log(this.state.response);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/teams");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Fragment>
        <Header />
        <h1>
          BIENVENUE SUR LA PLATEFORME MATURITY <br />
          Choisissez votre Feature Team!
        </h1>
        {this.state.response.map(e => (
          <Button
            classButton="buttonhome"
            textButton={e.nom_ft}
            key={e.id_ft}
            to={{
              pathname: `/board/${e.id_ft}`
            }}
          />
        ))}
      </Fragment>
    );
  }
}

export default Home;
