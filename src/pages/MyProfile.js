import React from "react";
import axios from "axios";

class MyProfile extends React.Component {
  state = {
    id: "",
    profilePicture: "",
    username: "",
    email: ""
  };

  componentDidMount() {
    console.log(sessionStorage.getItem("userToken"));
    let JWT = sessionStorage.getItem("userToken");
    axios
      .get(`https://insta.nextacademy.com/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${JWT}`
        }
      })
      .then(result => {
        console.log("Generic message");
        console.log(result);

        this.setState({});
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div>
        <h1>My Profile</h1>
      </div>
    );
  }
}

export default MyProfile;
