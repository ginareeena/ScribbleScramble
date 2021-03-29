import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WritingCanvas from "./WritingCanvas";
import DrawingCanvas from "./DrawingCanvas";
import LandingPageComp from "./LandingPage";
import EndGame from "./EndGame"
// Importing Modal for testing
import ModalComp from "./Modal"

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPageComp} />
        <Route path="/write" component={WritingCanvas} />
        <Route path="/draw" component={DrawingCanvas} />
        <Route path="/end" component={EndGame} />
        {/* Route for testing Modal component */}
        <Route path="/testing" component={ModalComp} />
      </Switch>
    </Router>
  );
};

export default Routes;
