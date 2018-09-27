import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Board from "./views/Board/Board";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/board" component={Board} />
        </Switch>
      </Router>
    );
  }
}

export default App;
