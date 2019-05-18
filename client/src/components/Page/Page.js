import React, { Component } from "react";
import Table from "../Table/Table.js";

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let page = parseInt(this.props.match.params.number);
    if (this.props.match.params.number === undefined) {
      page = 1;
    }
    //console.log(page);
    return (
      <Table
        page={page}
        showItem={this.props.showItem}
      />
    );
  }
}

export default Page;
