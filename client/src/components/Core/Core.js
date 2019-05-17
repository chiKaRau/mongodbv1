import React, { Component } from "react";
import "./Core.scss";
//import $ from "jquery";
//import { Form } from "react-bootstrap";
import axios from "axios";
import Table from "../Table/Table.js";
import Input from "../Input/Input.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import RoutePage from "../Page/RoutePage.js";
import Page from "../Page/Page.js";

class Core extends Component {
  state = {
    jobsAry: [],
    filterAry: [],
    query: "",
    showItem: 10
  };

  componentDidMount() {
    this.display();
  }

  //unlike v1, this app would query all data at once at the beginning
  //and modifly them in client side
  display = () => {
    axios
      .post("/Display")
      .then(res => {
        //console.log(res.data);
        this.setState({
          jobsAry: res.data,
          filterAry: res.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleChange = evt => {
    evt.preventDefault();
    const { name, value, type } = evt.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.filter(this.state.query);
      }
    );
  };

  pageButtons = () => {
    let pageAry = [];
    let length = this.state.jobsAry.length / this.state.showItem;
    for (let i = 0; i < length; i++) {
      pageAry.push(
        <li key={i + 1} className="page-item">
          <Link className="page-link" to={`${i + 1}`}>
            {i + 1}
          </Link>
        </li>
      );
    }
    return pageAry;
  };

  filter = str => {
    let filterAry = this.state.jobsAry;
    if (str) {
      filterAry = filterAry.filter(ele => {
        return (
          ele.company_name.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.address.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.position.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.salaray.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.contactInfo.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
          ele.post_date.toLowerCase().indexOf(str.toLowerCase()) > -1
        );
      });
    } else {
      //if input box is empty, change back to original list
      filterAry = this.state.jobsAry;
    }
    this.setState({
      filterAry: filterAry
    });
  };

  //here are situtation
  //first click
  //ary is unsorted
  //check if it is asc
  //since it is unsorted, then return asc

  //second click
  //ary is asc now
  //check if it is asc
  //since it is asc already, then return desc

  //third click
  //ary is desc now
  //check if it is asc
  //since it is desc, then return asc

  //fourth click
  //ary is asc now
  //check if it is asc
  //since it is asc already, then return desc

  sorter = n => {
    let temp = this.state.filterAry;
    let dir = "asc";

    //check if it is asc for Loop
    //if it is(there are no swtich), then dir = 'desc', return desc array
    //if it is not(there need some swtiches),
    //then that mean it is unsorted or desc, return asc array
    for (let i = 0; i < temp.length - 1; i++) {
      //if asc
      if (Object.values(temp[i])[n] < Object.values(temp[i + 1])[n]) {
        dir = "desc";
      }
    }

    //if statement for asc or desc
    //return asc if it is desc or unsorted
    //return desc if it is asc
    if (dir === "asc") {
      temp = temp.sort((a, b) =>
        Object.values(a)[n] < Object.values(b)[n]
          ? -1
          : Object.values(a)[n] > Object.values(b)[n]
          ? 1
          : 0
      );
    } else {
      temp = temp.sort((a, b) =>
        Object.values(a)[n] < Object.values(b)[n]
          ? 1
          : Object.values(a)[n] > Object.values(b)[n]
          ? -1
          : 0
      );
    }
    this.setState({
      filterAry: temp
    });
  };

  //Steps
  //Table is not sort yet
  //After user click header
  //do the sorting for asc
  //Now the table is asc
  //If after A, there no asc found: swtichcount (asc) is 0 and dir === asc
  //then Change to desc (dir = desc) and do the while loop again
  //now the loop will go through B instead of A

  paginator(items, page, per_page) {
    //current user page
    page = page || 1;

    //total item shows per page
    per_page = per_page || 10;
    //specify which items should be slice off
    let offset = (page - 1) * per_page;
    //Ex, user is on page 2
    //per_page is 5
    //total item is 12
    //[1,2,3,4,5,6,7,8,9,10,11,12]
    //offset is 1 * 5 = 5
    //start do the slicing from the 5th position
    //first slice: [6,7,8,9,10,11,12]
    //second slice: [6,7,8,9,10]
    let paginatedItems = items.slice(offset).slice(0, per_page);

    //total pages need for item
    let total_pages = Math.ceil(items.length / per_page);
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total_items: items.length,
      total_pages: total_pages,
      items_data: paginatedItems
    };
  }

  render() {
    return (
      <Router>
        <Input handleChange={this.handleChange} query={this.state.query} />
        <select
          value={this.state.showItem}
          onChange={this.handleChange}
          name="showItem"
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <Switch>
          {/*<Table sorter={this.sorter} filterAry={this.state.filterAry} />*/}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            render={props => (
              <Page
                sorter={this.sorter}
                filterAry={this.state.filterAry}
                paginator={this.paginator}
                tempsorter={this.tempsorter}
                showItem={this.state.showItem}
                {...props}
              />
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:number`}
            render={props => (
              <Page
                sorter={this.sorter}
                filterAry={this.state.filterAry}
                paginator={this.paginator}
                tempsorter={this.tempsorter}
                showItem={this.state.showItem}
                {...props}
              />
            )}
          />
        </Switch>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{this.pageButtons()}</ul>
        </nav>
      </Router>
    );
  }
}

export default Core;
