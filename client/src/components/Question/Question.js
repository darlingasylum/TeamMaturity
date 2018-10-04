import React from "react";
import "./Question.css";

class Question extends React.Component {
  render() {
    return (
      <div className="border" onClick={this.props.onClick}>
        <p className="p_question">
          {this.props.number} - {this.props.textQuestion}
        </p>
        <img src={this.props.sourceIcon} className="icon" />
      </div>
    );
  }
}

export default Question;
