import React, { Component } from 'react';
import Axios from "axios";
import jwt_decode from "jwt-decode";
import configData from "../config.json";
export default class ExamplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false, // Initialize the loggedIn state as false
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      };

      // Use the config object in your Axios requests to include the JWT token
      Axios.get('http://localhost:5000/login', config) 
        .then((res) => {
          // Handle the API response
          console.log(token);
          console.log(jwt_decode(token))
          // console.log(res.data);             //res.data will contain the user info
          this.setState({ loggedIn: true }); // Set the loggedIn state to true
        })
        .catch((error) => {
          // Handle the error
          console.log(error);
        });
    } else {
      // User is not logged in
      console.log('User is not logged in');
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        {loggedIn ? (
          <p>User is logged in</p>
        ) : (
          <p>User is not logged in</p>
        )}
        <p>Example Page</p>
      </div>
    );
  }
}
