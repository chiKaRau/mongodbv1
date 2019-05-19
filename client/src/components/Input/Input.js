import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //user input trigger server to find the result  
    return (
      <form onSubmit={this.props.handleSubmit} className="input-group mb-3">
        <input
          type="text"
          onChange={this.props.handleChange}
          placeholder="Type Something"
          value={this.props.query}
          name="query"
          className="form-control"
        />
        <div className="input-group-append">
          <button className="input-group-text" id="basic-addon2">
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default Input;
