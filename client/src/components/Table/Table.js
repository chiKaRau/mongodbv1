import React, { Component } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import axios from "axios";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageAry: [],
      page: "",
      _id: 1,
      post_date: -1,
      company_name: -1,
      address: -1,
      position: -1,
      salaray: -1,
      contactInfo: -1,
      previousSort: "_id"
    };
  }

  componentDidMount() {
    //this.displaySort();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //let say page 1
    //console.log("this.state.page: " + this.state.page);
    //console.log("this.props.page: " + this.props.page);

    //1st time (page 1)
    //this.props.page is the newest click page (1)
    //this.state.page is empty                 ("")
    //if they are not equal, set this.state.page equal this.props.page and do axios
    //this.props.page (1)
    //this.state.page (1)
    //since they are equal now, exit the if; no infinite loop

    //2nd time (we click page 2)
    //this props.page is newest click page (2)
    //this.state.page is empty             ("")
    //if they are not equal, set this.state.page equal this.props.page and do axios
    //this.props.page (2)
    //this.state.page (2)
    //since they are equal now, exit the if; no infinite loop

    //Note: this.state.page can be prevState.page
    //if we initial the page to this.props.page

    //redirect if showitem changed

    if (this.state.page !== this.props.page) {
      this.setState({
        page: this.props.page
      });
      //pass in clicked sort and its asc/desc
      this.displaySort(
        this.state.previousSort,
        this.state[this.state.previousSort]
      );
    }
  }

  sorter = str => {
    //console.log(this.state[str]);
    if (this.state[str] === 1) {
      this.setState(
        {
          [str]: -1
        },
        () => {
          this.displaySort(str, this.state[str]);
          this.setState({
            previousSort: str
          });
        }
      );
    } else {
      this.setState(
        {
          [str]: 1
        },
        () => {
          this.displaySort(str, this.state[str]);
          this.setState({
            previousSort: str
          });
        }
      );
    }
  };

  displaySort = (str, n) => {
    return axios
      .post("/Sort", {
        [str]: n,
        page: this.props.page,
        showItem: this.props.showItem
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          pageAry: res.data
        });
      });
  };

  render() {
    //console.log(this.props.page);
    //console.log(this.state.pageAry);
    const displayJob = this.state.pageAry.map(job => {
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
    return (
      <table id="myTable" className="table table-dark">
        <TableHeader sorter={this.sorter} />
        <TableBody
          page={this.props.page}
          showItem={this.props.showItem}
          pageAry={this.state.pageAry}
        />
      </table>
    );
  }
}

export default Table;
