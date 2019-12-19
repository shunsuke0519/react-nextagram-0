import React from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import Image from "react-graceful-image";

class UserProfile extends React.Component {
    state = {
      userProfile: []
    };
  
componentDidMount() {
      console.log(this.props);
      axios
        .get(
          `https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.id}`
        )
        .then(result => {
          console.log(result);
  
          this.setState({
            userProfile: result.data
          });
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    }
  
render() {
      return (
        <>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {this.state.userProfile.map(user => (
              <li>
                <div className="row">
                  <div className="col-sm-4 mb-2">
                    <Image
                      className="img-fluid"
                      style={{ height: "30vh" }}
                      src={user}
                      alt=""
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      );
    }
  }
  
export default UserProfile;
  