import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Memes from "./Memes";
import CreateMeme from "./CreateMeme";
import GeneratedMeme from "./GeneratedMeme";
import NotFound from "./NotFound";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Memes} />
      <Route exact path="/create" component={CreateMeme} />
      <Route exact path="/generated" component={GeneratedMeme} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
