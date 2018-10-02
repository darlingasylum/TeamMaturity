import React from "react";
import "./QuestionDialog.css";

class QuestionDialog extends React.Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.idQuestion = this.props.match.params.id_q;

    this.callApi()
      .then(response => {
        this.setState({ response });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(`/api/questions/${this.idQuestion}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    if (!this.state.response || this.state.response.length === []) return null;

    return (
      <div className="MaskPage">
        <div className="QuestionPopUp">
          <form onSubmit={this.handleSubmit}>
            {this.state.response.map(e => (
              <p>{e.intitule_q}</p>
            ))}
            <label>
              <br />
              <input type="radio" name="radiobutton" value="yes" />
              Oui <br />
              <input type="radio" name="radiobutton" value="no" /> Non
              <br />
              <input type="text" placeholder="Commentaire" />
            </label>
            <br /> <br />
            <input type="submit" value="Valider" />
          </form>
        </div>
      </div>
    );
  }
}

export default QuestionDialog;
