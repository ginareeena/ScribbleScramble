import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPageComp from "./LandingPage";
import EndGame from "./EndGame";
import CombinedCanvas from "./CombinedCanvas";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPageComp} />
        <Route path="/scramble/:room" component={CombinedCanvas}/>
        <Route path="/endgame" component={EndGame}/>

      </Switch>
    </Router>
  );
};

export default Routes;
