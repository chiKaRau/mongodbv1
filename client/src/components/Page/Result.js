import React, { Component } from "react";
import TableBody from "../Table/TableBody";
import TableHeader from "../Table/TableHeader";

class Result extends Component {
  constructor(props) {
    super(props);
  }

  sorter = n => {};

  render() {
    console.log(this.props.queryAry);
    return (
      <table id="myTable" className="table table-dark">
        <TableHeader sorter={this.sorter} />
        <TableBody
          page={1}
          showItem={this.props.showItem}
          pageAry={this.props.queryAry}
        />
      </table>
    );
  }
}

export default Result;
