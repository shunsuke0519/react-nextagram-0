import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { Route, Switch, Link, useParams } from "react-router-dom";
import { throwStatement } from "@babel/types";
import NavbarComponent from "../NavbarComponent";
import axios from "axios";

class LoginPage extends React.Component {
  state = {
    isLogin: true
  };

  toggleLogin = boolean => {
    const { isLogin } = this.state;

    this.setState({
      isLogin: boolean
    });
  };

  render() {
    return (
      <>
        <NavbarComponent toggleLogin={this.toggleLogin}></NavbarComponent>
        <div>
          {this.state.isLogin ? (
            <Login
              childState={this.state}
              toggleLogin={this.toggleLogin}
            ></Login>
          ) : (
            <Signup
              childState={this.state}
              toggleLogin={this.toggleLogin}
              signUpUser={this.props.signUpUser}
            ></Signup>
          )}
        </div>
      </>
    );
  }
}

export default LoginPage;
