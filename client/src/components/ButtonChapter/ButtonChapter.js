import React from "react";
// import "./ButtonChapter.css";

class ButtonChapter extends React.Component {
  render() {
    return (
      <div className={this.props.border} onClick={this.props.onClick}>
        <p className="p_question">
          {this.props.number} {this.props.textQuestion}
        </p>
        <img src={this.props.sourceIcon} className="icon" />
      </div>
    );
  }
}

export default ButtonChapter;
