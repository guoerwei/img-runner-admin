import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader/root";
import loadable from "react-loadable";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "./components/AppHeader";

import HomePage from "./views/Home";
const TinypngPage = loadable({
  loader: () => import("./views/Tinypng"),
  loading: () => null,
});
const HelpPage = loadable({
  loader: () => import("./views/Help"),
  loading: () => null,
});
const ImagePage = loadable({
  loader: () => import("./views/Image"),
  loading: () => null,
});

const App: FunctionComponent<{}> = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <div className="app-main">
          <Switch>
            <Route path="/image" component={ImagePage} />
            <Route path="/tinypng" component={TinypngPage} />
            <Route path="/help" component={HelpPage} />
            <Route component={HomePage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default hot(App);
