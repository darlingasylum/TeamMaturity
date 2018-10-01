import React from "react";
import "./Question.css";

class Question extends React.Component {
  render() {
    return (
      <div>
        <div className="border">
          <p>{this.props.textQuestion}</p>
          <img src={this.props.sourceIcon} />
        </div>
      </div>
    );
  }
}

export default Question;
