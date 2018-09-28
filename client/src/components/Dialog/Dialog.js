import React from "react";
import Button from "../Button/Button";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(event) {
  //   this.setState({ value: event.target.value });
  // }
  render() {
    console.log(this.state);
    return (
      <div className="mask">
        <div className="popup">
          <form onSubmit={this.handleSubmit}>
            <i className="fas fa-times" onClick={this.props.toggleDialog} />
            <span>Donnez un nom à votre campagne</span>
            <input
              value={this.state.value}
              onChange={this.handleChange}
              type="text"
              placeholder="Nom de la campagne"
            />
            <Button textButton="Valider" onClick={this.props.toggleDialog} />
          </form>
        </div>
      </div>
    );
  }
}

export default Dialog;
