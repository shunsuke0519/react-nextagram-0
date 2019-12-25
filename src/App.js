import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Jumbotron, Button } from "reactstrap";
import styled from "styled-components";
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
import Homepage from "./pages/Homepage";
import UserImage from "./containers/UserImage";
import { Route, Switch, Link, useParams } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Username from "./pages/UserName";
import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";
import NavbarComponent from "./NavbarComponent";
import UploadPage from "./pages/UploadPage";

class App extends React.Component {
  state = {
    currentUser: { loggedIn: false }
  };

  signUpUser = (newUsername, newEmail, newPassword, newConfirmPassword) => {
    let user = sessionStorage.getItem("userData"); //"{}" or null or false

    if (user) {
      user = JSON.parse(user);
      this.setState({
        currentUser: { ...user, loggedIn: true }
      });
    }

    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username: newUsername,
        email: newEmail,
        password: newPassword
      })
      .then(result => {
        let JWT = result.data.auth_token;
        sessionStorage.setItem("userToken", JWT);
        sessionStorage.setItem("userData", JSON.stringify(result.data.user));
        this.setState({
          currentUser: { ...result.data.user, loggedIn: true }
        });
      })
      .catch(error => {
        console.error(error.response);
      });

    // console.log(username, password);
  };

  render() {
    return (
      <div>
        {/* <Link to="/">Home</Link>
        <Link to="/user/1">My Profile</Link> */}

        <Route
          path="/upload"
          component={props => {
            return <UploadPage {...props} />;
          }}
        />

        <Route
          exact
          path="/"
          component={props => {
            return <Homepage {...props} />;
          }}
        />

        <Route
          path="/user/:id"
          component={props => {
            return <Username {...props} />;
          }}
        />
        <Route
          path="/user/:id"
          component={props => {
            return <UserProfile {...props} />;
          }}
        />

        <Route
          path="/Login"
          component={props => {
            return <LoginPage {...props} signUpUser={this.signUpUser} />;
          }}
        />

        <Route
          exact
          path="/myprofile"
          component={() => {
            return <MyProfile />;
          }}
        />
      </div>
    );
  }
}
export default App;
