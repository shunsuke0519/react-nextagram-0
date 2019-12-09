import React from 'react';
import axios from 'axios';
import loader from "./loading2.gif";
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';


const imageStyle = {
  height: "30vh",
  width: "30vh",
  borderRadius: "50%",
  overflow: "hidden"
};

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class App extends React.Component{
  
  state ={
    users:[],
    usreImage:[],
    isLoading: true,
  };

componentDidMount(){
  axios.get('https://insta.nextacademy.com/api/v1/users')
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

render(){
  if(this.state.isLoading){
    return(
      <div className='sweet-loading'>
        <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={50}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div> 
  );
}

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