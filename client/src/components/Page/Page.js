import React, { Component } from "react";
import Table from "../Table/Table.js";

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let page = this.props.match.params.number;
    if (this.props.match.params.number === undefined) {
      page = 1;
    }
    //console.log(page);
    return (
      <Table
        page={page}
        sorter={this.props.sorter}
        filterAry={this.props.filterAry}
        paginator={this.props.paginator}
        tempsorter={this.props.tempsorter}
        showItem={this.props.showItem}
      />
    );
  }
}

export default Page;
