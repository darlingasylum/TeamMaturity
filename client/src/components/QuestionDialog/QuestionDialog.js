import React, { Fragment } from "react";

import Header from "../../components/Header/Header";
import Button from "../Button/Button";

import "./QuestionDialog.css";

class QuestionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: [], input_button_value: "", input_text_value: "" };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.onButtonChanged = this.onButtonChanged.bind(this);
    this.idQuestion = this.props.match.params.id_q;
  }

  componentDidMount() {
    //récupère l'intitulé de la question dans la DB

    this.callApi()
      .then(response => {
        this.setState({ response });
        //console.log(response);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(`/api/questions/${this.idQuestion}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  //stocke les réponses dans le state
  onTextChanged(event) {
    this.setState({ input_text_value: event.target.value });
  }

  onButtonChanged(event) {
    this.setState({ input_button_value: event.target.value });
  }

  //gère l'envoi de la réponse au clic sur "valider"
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.input_button_value.length === 0) {
      window.alert("Vous n'avez pas répondu à la question");
    } else {
      const currentCampaignId = sessionStorage.getItem("currentCampaignId");

      //POST LA REPONSE à la DB
      const response_infos = {
        id_camp_r: currentCampaignId,
        id_q_r: this.idQuestion,
        reponse_r: this.state.input_button_value,
        commentaire_r: this.state.input_text_value
      };

      const fetch_param = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(response_infos)
      };

      fetch("/api/send_response", fetch_param)
        .then(function(results) {
          return results.json();
        })
        .then(function(myresults) {});

      //revient à la page précédente
      window.history.go(-1);
    }
  };

  render() {
    if (!this.state.response || this.state.response.length == []) return null;

    return (
      <Fragment>
        <Header
          header="header"
          className="buttonreturn"
          teamName={sessionStorage.getItem("currentFTName")}
          teamNameClass="header_team"
        />
        <div className="MaskPage">
          <div className="QuestionPopUp">
            <form onSubmit={this.handleSubmit} className="FormQuestionDialog">
              {this.state.response.map(e => (
                <a href={this.state.response[0].lien_q} target="_blank">
                  {" "}
                  <p className="TextQuestionDialog">{e.intitule_q}</p>{" "}
                </a>
              ))}
              <label className="LabelQuestionDialog">
                <br />
                <input
                  type="radio"
                  name="radiobutton"
                  value="1"
                  onChange={this.onButtonChanged}
                />
                Oui <br />
                <input
                  type="radio"
                  name="radiobutton"
                  value="0"
                  onChange={this.onButtonChanged}
                />{" "}
                Non
                <br />
                <input
                  className="InputQuestionDialog"
                  type="text"
                  placeholder="Commentaire"
                  onChange={this.onTextChanged}
                />
              </label>
              <br /> <br />
              <input type="submit" value="Valider" className="ValideBtnSize" />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QuestionDialog;
