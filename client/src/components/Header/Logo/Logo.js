import React from "react";
import Image from "./Image/logo.png";

class Logo extends React.Component {
  render() {
    return (
      <img
        style={{
          objectFit: "contain",
          marginLeft: "29%"
        }}
        src={Image}
        alt="logo leboncoin"
      />
    );
  }
}

export default Logo;
