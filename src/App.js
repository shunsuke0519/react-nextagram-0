import React from 'react';
import Homepage from "./pages/Homepage";
import UserProfile from './pages/UserProfile';
import { Route, Link } from "react-router-dom";
import Username from "./pages/UserName";


class App extends React.Component{
render(){
  return(
<div>
      {/* <Link to="/">Home</Link> */}
      {/* We temporarily hardcode this to user id 1*/}
      {/* <Link to="/users/1">My Profile</Link> */}

      <Route 
      exact path="/" component={Homepage} />
            
      {/* 3. Display user name */}
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
        </div>

  ); 
}
}



  


export default App;