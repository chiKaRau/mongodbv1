import React, { Component } from "react";

class TableHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <thead>
        <tr>
          <th scope="row" onClick={() => this.props.sorter(0)}>ID</th>
          <th onClick={() => this.props.sorter(1)}>Post Date</th>
          <th onClick={() => this.props.sorter(2)}>Company_Name</th>
          <th onClick={() => this.props.sorter(3)}>Address</th>
          <th onClick={() => this.props.sorter(4)}>Position</th>
          <th onClick={() => this.props.sorter(5)}>Salary</th>
          <th onClick={() => this.props.sorter(6)}>Contact Email</th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
