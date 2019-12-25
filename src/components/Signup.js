import React from "react";
import axios from "axios";
import { throwStatement } from "@babel/types";
import { FormGroup, FormFeedback, Label, FormText, Input } from "reactstrap";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameValid: false,
    passwordValid: true,
    confirmPasswordValid: true
  };

  //  ********** SECTION 1 **********
  //  Functions to store input values into state

  //   Refer Advanced form validation section for handleUserName
  //   handleUsername = event => {
  //     const { username, email, password, confirmPassword } = this.state;

  //     this.setState({
  //       username: event.target.value
  //     });
  //   };

  handleEmail = event => {
    const { username, email, password, confirmPassword } = this.state;

    this.setState({
      email: event.target.value
    });
  };

  //   Refer Advanced form validation section for handlePassword

  handlePassword = event => {
    const { username, email, password, confirmPassword } = this.state;

    this.setState({
      password: event.target.value
    });
  };

  handleConfirmPassword = event => {
    const { username, email, password, confirmPassword } = this.state;

    this.setState({
      confirmPassword: event.target.value
    });
  };

  //  ********** END OF SECTION 1 **********

  //  ********** SECTION 2 **********
  //  Function to handle on click of submit button to send a POST request to parent (App.js)
  handleSubmit = event => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = this.state;
    // console.log(this.state.password.length);
    // console.log(this.checkPasswordLength());
    if (this.checkPasswordLength()) {
      alert("Please ensure password is six(6) or more characters !");
    } else if (this.checkPassword()) {
      alert("Please ensure same password !");
    } else {
      this.props.signUpUser(username, email, password, confirmPassword);
    }
  };

  //  ********** END OF SECTION 2 **********

  //  ********** SECTION 3 **********
  //  Basic form validation
  checkPasswordLength = () => {
    if (parseInt(this.state.password.length) < 6) {
      return true;
    } else {
      return false;
    }
  };

  checkPassword = event => {
    if (this.state.password !== this.state.confirmPassword) {
      return true;
    }
  };

  //   Advanced form valition involving checks to backend API (i.e. whether account is existent)
  // 1. Username Validation
  handleUsername = event => {
    let x = { ...event };
    let delay = setTimeout(() => this.handleUsernameCheck(x), 300);

    const { username, email, password, confirmPassword } = this.state;

    this.setState({
      username: event.target.value,
      delay
    });
  };

  handleUsernameCheck = e => {
    const newUsername = e.target.value;

    if (newUsername.length >= 6) {
      axios
        .get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        )
        .then(response => {
          console.log(response);

          if (response.data.valid == true) {
            this.setState({
              usernameValid: true
            });
          } else {
            this.setState({
              usernameValid: false
            });
          }
        })
        .catch(error => {
          console.log("ERROR", error);
        });
    }
  };

  //   Handle password validation

  handlePassword = event => {
    const { username, email, password, confirmPassword } = this.state;

    this.setState({
      password: event.target.value
    });
  };

  //  ********** END OF SECTION 3 **********

  render() {
    console.log(this.state.passwordValid);
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h1 className="mb-3">SignUp</h1>
          <form
            onSubmit={this.handleSubmit}
            className="align-items-center"
            style={{ textAlign: "center" }}
          >
            <FormGroup>
              <Input
                style={{ display: "block", margin: "auto", width: "25vw" }}
                type="text"
                name="username"
                placeholder="Choose a username min 6 characters"
                onChange={e => {
                  if (this.state.delay) {
                    clearTimeout(this.state.delay);
                  }
                  {
                    this.handleUsername(e);
                  }
                }}
                {...(this.state.username.length >= 6
                  ? this.state.usernameValid
                    ? { valid: true }
                    : { invalid: true }
                  : this.state.username.length > 0
                  ? { invalid: true }
                  : "")}
              ></Input>

              <FormFeedback
                {...(this.state.username.length > 0 &&
                this.state.username.length >= 6
                  ? this.state.usernameValid
                    ? { valid: true }
                    : { invalid: true }
                  : { invalid: true })}
              >
                {this.state.username.length >= 6
                  ? this.state.usernameValid
                    ? "Sweet, this username is available!"
                    : "Sorry, this username is taken!"
                  : "Must be minimum 6 characters"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Input
                style={{ display: "block", margin: "auto", width: "25vw" }}
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={this.handleEmail}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Input
                style={{ display: "block", margin: "auto", width: "25vw" }}
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={this.handlePassword}
                {...(this.state.password.length >= 6
                  ? { valid: true }
                  : this.state.password.length >= 0
                  ? { invalid: true }
                  : "")}
              ></Input>
              <FormFeedback
                {...(this.state.password.length > 0 &&
                this.state.password.length >= 6
                  ? this.state.passwordValid
                    ? { valid: true }
                    : { invalid: true }
                  : { invalid: true })}
              >
                {this.state.password.length >= 6
                  ? this.state.passwordValid
                    ? ""
                    : "Password must be a minimum of 6 characters !"
                  : "Password must be a minimum of 6 characters !"}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input
                style={{ display: "block", margin: "auto", width: "25vw" }}
                type="password"
                name="confirm password"
                placeholder="Enter your password for once more"
                onChange={this.handleConfirmPassword}
                {...(this.state.password === this.state.confirmPassword
                  ? this.state.confirmPasswordValid
                    ? { valid: true }
                    : { invalid: true }
                  : { invalid: true })}
              ></Input>
              <FormFeedback
                {...(this.state.password === this.state.confirmPassword
                  ? this.state.confirmPasswordValid
                    ? { valid: true }
                    : { invalid: true }
                  : { invalid: true })}
              >
                {this.state.password === this.state.confirmPassword
                  ? this.state.confirmPasswordValid
                    ? ""
                    : "Password Confirmed !"
                  : "Password is not the same !"}
              </FormFeedback>
            </FormGroup>
            <input
              disabled={
                !this.state.username ||
                !this.state.email ||
                !this.state.password ||
                !this.state.confirmPassword
                  ? "disabled"
                  : undefined
              }
              className="btn btn-primary mt-3"
              type="submit"
            ></input>
          </form>
          <button
            className="btn btn-link"
            onClick={() => this.props.toggleLogin(true)}
          >
            Alredy have an account? Login now !
          </button>
        </div>
      </>
    );
  }
}

export default Signup;
