import React from 'react';
import axios from 'axios';

const imageStyle = {
  height: "30vh",
  width: "30vh",
  borderRadius: "50%",
  overflow: "hidden"
};


class App extends React.Component{
  
  state ={
    users:[],
    usreImage:[],
  };

componentDidMount(){
  axios.get('https://insta.nextacademy.com/api/v1/users')
  .then(result => {
    console.log(result);

      // If successful, we do stuffs with 'result'
      this.setState({ 
        users: result.data,
      });
  })
  .catch(error => {
    // If unsuccessful, we notify users what went wrong
    console.log("ERROR: ", error);
  });
}

render(){
  return <ul>{this.state.users.map(user => 
  <li>{user.username}
  <img 
  className="mb-5"
  style={imageStyle}
  src={user.profileImage}
  alt="profileImage"
  />
  </li>
)}
  </ul>;
  }
}


export default App;