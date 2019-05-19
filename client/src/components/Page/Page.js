import React, { Component } from "react";
import Table from "../Table/Table.js";
import axios from "axios";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_data: 0
    };
  }

  componentDidMount() {
    //Query total length and creats buttons
    this.display();
  }

  //query length of total_data and creates buttons
  display = () => {
    axios
      .post("/Display")
      .then(res => {
        this.setState({
          total_data: res.data.length
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    let page = parseInt(this.props.match.params.number);
    if (this.props.match.params.number === undefined) {
      page = 1;
    }

    //if user input, then pass the result data to <Table />
    if (this.props.queryAry !== undefined && this.props.queryAry.length > 0) {
      return (
        <div>
          <Table
            page={page}
            showItem={this.props.showItem}
            queryAry={this.props.queryAry}
          />
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {this.props.pageButtons(1)}
            </ul>
          </nav>
        </div>
      );
    } else {
      //else pass the (showItem) data to <Table />
      //The app would query a number of data (depend on showItem) from database
      //instead of all the data
      return (
        <div>
          <Table page={page} showItem={this.props.showItem} />
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {this.props.pageButtons(this.state.total_data)}
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Page;
