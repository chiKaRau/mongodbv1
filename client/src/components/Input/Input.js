import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="input-group mb-3">
        <input
          type="text"
          onChange={this.props.handleChange}
          placeholder="Type Something"
          value={this.props.query}
          name="query"
          className="form-control"
        />
      </form>
    );
  }
}

export default Input;
