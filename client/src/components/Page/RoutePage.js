/*
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Page from "./Page.js";

class RoutePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.routeType === "/") {
      return (
        <Route
          exact
          path="/"
          render={props => (
            <Page
              sorter={this.props.sorter}
              filterAry={this.props.filterAry}
              paginator={this.props.paginator}
              {...props}
            />
          )}
        />
      );
    } else {
      return (
        <Route
          path="/:number"
          render={props => (
            <Page
              sorter={this.props.sorter}
              filterAry={this.props.filterAry}
              paginator={this.props.paginator}
              {...props}
            />
          )}
        />
      );
    }
  }
}

export default RoutePage;
*/
