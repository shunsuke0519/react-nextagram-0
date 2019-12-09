import React,{useState} from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "blake",
      profileImage:
        "http://next-curriculum-instagram.s3.amazonaws.com/idol2-blake.jpg"
    },
    {
      id: 2,
      username: "ryanG",
      profileImage:
        "http://next-curriculum-instagram.s3.amazonaws.com/idol1-ryan.jpg"
    },
    {
      id: 3,
      username: "bigfan",
      profileImage:
        "http://next-curriculum-instagram.s3.amazonaws.com/bigfan-9AE7468E-4C35-41D1-AA68-31939891B5E1.png"
    }
  ]);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>

        {/* {users.map(user => (
          <li> */}
          {/* assing key */}
        {users.map((user, index) => (
          <li key={index}>

            {user.id}: {user.profileImage}
          </li>

        ))}
      </ul>
    </div>
  );
}

export default App;
