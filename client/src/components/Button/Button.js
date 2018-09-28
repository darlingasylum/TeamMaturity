import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

class Button extends React.Component {
  renderLink() {
    const { to, textButton, classButton } = this.props;

    return (
      <Link to={to}>
        <button className={classButton}>{textButton}</button>
      </Link>
    );
  }
  renderButton() {
    const { textButton, classButton, onClick } = this.props;

    return (
      <button className={classButton} onClick={onClick}>
        {textButton}
      </button>
    );
  }

  render() {
    const { to } = this.props;
    if (typeof to !== "undefined") {
      return this.renderLink();
    } else {
      return this.renderButton();
    }
  }
}

export default Button;
