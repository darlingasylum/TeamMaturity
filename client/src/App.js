import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Board from "./views/Board/Board";
import Themes from "./views/Themes/Themes";
import CampaignProcess from "./views/Campaign/CampaignProcess";
import CampaignQualite from "./views/Campaign/CampaignQualite";
import CampaignValeurs from "./views/Campaign/CampaignValeurs";
import Results from "./views/Results/Results";

import "./App.css";
import QuestionDialog from "./components/QuestionDialog/QuestionDialog";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/themes" component={Themes} />
          <Route path="/campaign/process" component={CampaignProcess} />
          <Route path="/campaign/qualite" component={CampaignQualite} />
          <Route path="/campaign/valeurs" component={CampaignValeurs} />
          <Route path="/campaign/question/:id_q" component={QuestionDialog} />
          <Route path="/board/:id" component={Board} />
          <Route path="/results/:id/:id_camp" component={Results} />
        </Switch>
      </Router>
    );
  }
}

export default App;
