import React from 'react';
import axios from 'axios';
import loader from "./loading2.gif";
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import UserImage from "./UserImage";



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


class Homepage extends React.Component{
  
  state ={
    users:[],
    userImage:[],
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

  return (
  <div>
    <ul style={{ listStyleType: "none", padding: "0"}}>
      {this.state.users.map((user, index) => (
  <li key={index}>
  <div className="row border border-0 mb-5 rounded pt-3 pb-3 bg-light">
  <div
      style={{ margin: "auto", textAlign: "center" }}
      className="col-sm-2 mb-5"
  >
    <p style={{ fontWeight: "bold" }}>
    {user.username}
    </p>

    </div>


  <img 
  className="mb-5"
  style={imageStyle}
  src={user.profileImage}
  alt="profileImage"
  />


<a href="" className="btn btn-primary btn-block" style={{color:"blue"}}>
                    See More
</a>

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
