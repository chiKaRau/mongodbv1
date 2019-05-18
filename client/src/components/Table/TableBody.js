import React, { Component } from "react";

class TableBody extends Component {
  constructor(props) {
    super(props);
  }

  //component change
  //do rerender
  //data 0 1 2 3 4 5 6

  render() {
    const displayJob = this.props.pageAry.map(job => {
      let post_date = job.post_date;
      return (
        <tr key={job._id}>
          <th scope="row">{job._id + 1}</th>
          <td>{post_date.slice(0, 10)}</td>
          <td>{job.company_name}</td>
          <td>{job.address}</td>
          <td>{job.position}</td>
          <td>{job.salaray}</td>
          <td>{job.contactInfo}</td>
        </tr>
      );
    });

    return <tbody>{displayJob}</tbody>;
  }
}

export default TableBody;
