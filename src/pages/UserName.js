import React from "react";
import axios from "axios";
import { Route, Switch, Link } from "react-router-dom";
import Image from "react-graceful-image";

const imageStyle = {
  height: "30vh"
};

class Username extends React.Component {
  state = {
    userName: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/${this.props.match.params.id}`
      )
      .then(result => {
        console.log(result);

        this.setState({
          userName: result.data
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }

  render() {
    return (
      <>
        <p>@{this.state.userName.username}</p>
        <div className="row">
          <div className="col-sm-3">
            <Image
              className="mb-3"
              style={imageStyle}
              src={this.state.userName.profileImage}
            />
          </div>
          <div className="col-sm-3"></div>
          <div className="col-sm-3"></div>
        </div>
      </>
    );
  }
}

export default Username;
