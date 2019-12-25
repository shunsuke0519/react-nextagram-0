import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleUsername = event => {
    const { username, password } = this.state;

    this.setState({
      username: event.target.value
    });
  };

  handlePassword = event => {
    const { username, password } = this.state;

    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    axios
      .post(`https://insta.nextacademy.com/api/v1/login`, {
        username,
        password
      })
      .then(result => {
        console.log(result);
        let JWT = result.data.auth_token;
        sessionStorage.setItem("userToken", JWT);
        sessionStorage.setItem("userData", JSON.stringify(result.data.user));
        alert(result.data.message);
        window.location = "/";
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  

  render() {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h1>Login</h1>
          <form
            onSubmit={this.handleSubmit}
            className="align-items-center"
            style={{ textAlign: "center" }}
          >
            <input
              style={{ display: "block", margin: "auto", width: "25vw" }}
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={this.handleUsername}
            ></input>
            <input
              style={{ display: "block", margin: "auto", width: "25vw" }}
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={this.handlePassword}
            ></input>
            <input className="btn btn-primary mt-3" type="submit"></input>
          </form>
          <button
            className="btn btn-link"
            onClick={() => this.props.toggleLogin(false)}
          >
            Don't have an account? Sign Up Now !
          </button>
        </div>
      </>
    );
  }
}

export default Login;
