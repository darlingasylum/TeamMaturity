import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { withRouter } from "react-router";

import Logo from "./Logo/Logo";
import Button from "../Button/Button";

import "./header.css";

class Header extends React.Component {
  render() {
    console.log("Router", Router);
    console.log("Props", this.props);

    return (
      <div>
        <nav className="header">
          {/* <Button classbutton="buttonreturn" textbutton="RETOUR" /> */}
          <button
            onClick={() => this.props.history.goBack()}
            className="buttonreturn"
          >
            RETOUR
          </button>
          <Logo />
          <p className="p_maturity">maturity</p>
        </nav>
      </div>
    );
  }
}

const extendedHeader = withRouter(Header);
export default extendedHeader;
