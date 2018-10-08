import React from "react";
import Image from "./Image/logo.png";

class Logo extends React.Component {
  render() {
    return (
      <img
        className="returnbtn"
        style={{
          objectFit: "contain"
        }}
        src={Image}
        alt="logo leboncoin"
      />
    );
  }
}

export default Logo;
