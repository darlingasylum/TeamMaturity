import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Logo from "./Logo/Logo";

import "./header.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className={this.props.header}>
          <button
            className={this.props.className}
            onClick={() => this.props.history.goBack()}
          >
            RETOUR
          </button>
          <Link
            to={{
              pathname: `/`
            }}
          >
            <Logo />
          </Link>

          <p className="p_maturity">maturity</p>
          <Link
            to={{
              pathname: `/board/${this.props.teamId}`
            }}
          >
            <p className={this.props.teamNameClass}>{this.props.teamName}</p>{" "}
          </Link>
        </nav>
      </div>
    );
  }
}

const extendedHeader = withRouter(Header);
export default extendedHeader;
