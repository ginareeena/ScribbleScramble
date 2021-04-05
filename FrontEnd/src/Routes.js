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
        <Route exact path="/endgame" component={EndGame}/>
        <Route path="/:room" component={CombinedCanvas}/>
        

      </Switch>
    </Router>
  );
};

export default Routes;
