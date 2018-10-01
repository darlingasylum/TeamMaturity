import React from "react";
import { withRouter } from "react-router";

import Logo from "./Logo/Logo";

import "./header.css";

class Header extends React.Component {
  render() {
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
