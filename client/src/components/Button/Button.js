import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

class Button extends React.Component {
  render() {
    const { to, textButton, classButton } = this.props;

    return (
      <Link to={to}>
        <button className={classButton}>{textButton}</button>
      </Link>
    );
  }
}

export default Button;
