import React from "react";
import { withRouter } from "react-router";

import Logo from "./Logo/Logo";

import "./header.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="header">
          <button
            className={this.props.className}
            onClick={() => this.props.history.goBack()}
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
