import React from "react";
import "../App.css";
import axios from "axios";
import { Jumbotron, Button } from "reactstrap";
import styled from "styled-components";
import loader from "../loading2.gif";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import UserImage from "../containers/UserImage";
import { Route, Switch, Link, useParams, Redirect } from "react-router-dom";
import NavbarComponent from "../NavbarComponent";

const imageStyle = {
  height: "30vh",
  width: "30vh",
  borderRadius: "50%",
  overflow: "hidden"
};

class Homepage extends React.Component {
  state = {
    users: [],
    userImage: [],
    isLoading: true,
    isLogin: true,
    currentUser: { loggedIn: false }
  };

  checkLogIn = () => {
    if (sessionStorage.getItem("userData")) {
      this.setState({
        currentUser: { loggedIn: true }
      });
    }
  };

  toggleLogin = boolean => {
    const { isLogin } = this.state;

    this.setState({
      isLogin: boolean
    });
  };

  redirect = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    // performing a GET request
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        console.log(result);

        // If successful, we do stuffs with 'result'
        this.setState({
          users: result.data,
          isLoading: false
        });
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }

  // componentDidUpdate() {
  //
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img style={{ textAlign: "center" }} src={loader}></img>
        </div>
      );
    }

    return (
      <div>
        <NavbarComponent
          toggleLogin={this.toggleLogin}
          checkLogIn={this.checkLogIn}
          currentUser={this.state.currentUser}
        ></NavbarComponent>

        <ul style={{ listStyleType: "none", padding: "0" }}>
          {this.state.users.map((user, index) => (
            <li key={index}>
              <div className="row border border-0 mb-5 rounded pt-3 pb-3 bg-light">
                <div
                  style={{ margin: "auto", textAlign: "center" }}
                  className="col-sm-2 mb-5"
                >
                  <p>
                    <Link
                      to={`/user/${user.id}`}
                      href=""
                      style={{ fontWeight: "bold" }}
                    >
                      {user.username}
                    </Link>
                  </p>

                  <img
                    className="mb-5"
                    style={imageStyle}
                    src={user.profileImage}
                    alt="profileImage"
                  />

                  <a href="" className="btn btn-primary btn-block">
                    See More
                  </a>
                </div>

                <UserImage
                  //   childUser={this.state.users}
                  childID={user.id}
                ></UserImage>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Homepage;
