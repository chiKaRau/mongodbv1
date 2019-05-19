import React, { Component } from "react";

class TableHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //Clicking the Table header to do the sorting
    return (
      <thead>
        <tr>
          <th scope="row" onClick={() => this.props.sorter('_id')}>ID</th>
          <th onClick={() => this.props.sorter('post_date')}>Post Date</th>
          <th onClick={() => this.props.sorter('company_name')}>Company_Name</th>
          <th onClick={() => this.props.sorter('address')}>Address</th>
          <th onClick={() => this.props.sorter('position')}>Position</th>
          <th onClick={() => this.props.sorter('salaray')}>Salary</th>
          <th onClick={() => this.props.sorter('contact_email')}>Contact Email</th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
