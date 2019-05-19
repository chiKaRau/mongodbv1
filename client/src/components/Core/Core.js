import React, { Component } from "react";
import "./Core.scss";
//import $ from "jquery";
//import { Form } from "react-bootstrap";
import axios from "axios";
import Table from "../Table/Table.js";
import Input from "../Input/Input.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import RoutePage from "../Page/RoutePage.js";
import Page from "../Page/Page.js";
import Result from "../Page/Result.js";

//(imagine you have big data; the filter(v2) would receive all data and do filtering)
//We don't want to receive all data; we do the querying with mongodb

class Core extends Component {
  state = {
    total_data: 0,
    query: "",
    queryAry: [],
    showItem: 10
  };

  handleChange = evt => {
    evt.preventDefault();
    const { name, value, type } = evt.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.query === "" || this.state.query === undefined) {
      alert("Please Type In Any Letters");
    } else {
      let sort = { query: this.state.query };
      axios.post("/Query", sort).then(res => {
        this.setState({
          queryAry: res.data
        });
      });
    }
  };

  pageButtons = n => {
    let pageButtonsAry = [];
    let length = n / this.state.showItem;
    for (let i = 0; i < length; i++) {
      pageButtonsAry.push(
        <li key={i + 1} className="page-item">
          <Link className="page-link" to={`${i + 1}`}>
            {i + 1}
          </Link>
        </li>
      );
    }
    return pageButtonsAry;
  };

  render() {
    console.log(this.state.queryAry);
    return (
      <Router>
        <Input
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          query={this.state.query}
        />
        {this.state.queryAry.length > 0 ? (
          <select
            value={this.state.showItem}
            onChange={this.handleChange}
            name="showItem"
            disabled
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
        ) : (
          <select
            value={this.state.showItem}
            onChange={this.handleChange}
            name="showItem"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
        )}
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            render={props => (
              <Page
                showItem={this.state.showItem}
                pageButtons={this.pageButtons}
                queryAry={this.state.queryAry}
                {...props}
              />
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:number`}
            render={props => (
              <Page
                showItem={this.state.showItem}
                pageButtons={this.pageButtons}
                queryAry={this.state.queryAry}
                {...props}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default Core;
