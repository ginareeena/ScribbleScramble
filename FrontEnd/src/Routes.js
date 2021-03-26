import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WritingCanvas from "./WritingCanvas";
import DrawingCanvas from "./DrawingCanvas";
import Home from "./HomePage";
import WaitingRoom from './WaitingRoom'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/write" component={WritingCanvas} />
        <Route exact path="/draw" component={DrawingCanvas} />
        {/* <Route path="/connecting" component={WaitingRoom} /> */}
      </Switch>
      f
    </Router>
  );
};

export default Routes;
