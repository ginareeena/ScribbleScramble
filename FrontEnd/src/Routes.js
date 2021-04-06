import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { default as LandingPage } from "./LandingPage";
import EndGame from "./EndGame";
import CombinedCanvas from "./CombinedCanvas";
import NoScribbles from "./NoScribbles"

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/endgame" component={EndGame} />
        <Route path="/scramble/:room" component={CombinedCanvas} />
        <Route component={NoScribbles} />
      </Switch>
    </Router>
  );
};

export default Routes;
