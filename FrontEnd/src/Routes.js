import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WritingCanvas from "./WritingCanvas"
import Drawing from "./Drawing";
import String from "./String"

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/write" component={WritingCanvas} />
        <Route exact path="/draw" component={Drawing} />
        <Route exact path="/string" component={String} />
      </Switch>
    </Router>
  );
};

export default Routes;
