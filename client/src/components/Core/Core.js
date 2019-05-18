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

//filter X
//this.display() -> filteredAry -> filtering X

//(imagine you have big data; the filter(v2) would receive all data and do filtering)
//We don't want to receive all data; we do the querying with mongodb
//express.js -> querying -> data -> pagination

//sorting
//express.js -> sort and page# -> data -> pagination

class Core extends Component {
  state = {
    total_data: 0,
    query: "",
    showItem: 10
  };

  componentDidMount() {
    //Query total length and creats buttons
    this.display();
  }

  display = () => {
    axios
      .post("/Display")
      .then(res => {
        this.setState({
          total_data: res.data.length,
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleChange = evt => {
    evt.preventDefault();
    const { name, value, type } = evt.target;
    this.setState({
      [name]: value
    });
  };

  pageButtons = () => {
    let pageButtonsAry = [];
    let length = this.state.total_data / this.state.showItem;
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
    return (
      <Router>
        <Input handleChange={this.handleChange} query={this.state.query} />
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
        <Switch>
          {/*<Table sorter={this.sorter} filterAry={this.state.filterAry} />*/}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            render={props => (
              <Page
                showItem={this.state.showItem}
                {...props}
              />
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:number`}
            render={props => (
              <Page
                showItem={this.state.showItem}
                {...props}
              />
            )}
          />
        </Switch>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{this.pageButtons()}</ul>
        </nav>
      </Router>
    );
  }
}

export default Core;
