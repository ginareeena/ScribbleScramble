import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WritingCanvas from "./WritingCanvas"
import DrawingCanvas from "./DrawingCanvas";


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/write" component={WritingCanvas} />
        <Route path="/draw" component={DrawingCanvas} />
      </Switch>
    </Router>
  );
};

export default Routes;
