import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import String from "./String";
import Drawing from "./Drawing";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/string" component={String} />
        <Route exact path="/draw" component={Drawing} />
      </Switch>
    </Router>
  );
};

export default Routes;
