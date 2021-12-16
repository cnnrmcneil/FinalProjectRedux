import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  updatePassword,
  updateUsername,
  updateUserID,
} from "../redux/actionCreator/userActions";
import { updateToken } from "../redux/actionCreator/loginActions";

import axios from "axios";

function Login(props) {
  const [isSending, setIsSending] = React.useState(false);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/users/login", {
  //       username: props.userInfo.username,
  //       password: props.userInfo.password,
  //     })
  //     .then((results) => {
  //       console.log(results);
  //       props.updateToken(results.data.token);
  //       props.updateUserID(results.data.id);
  //     })
  //     .catch((err) => {
  //       console.log("Something went wrong", err);
  //     });
  // }, [isSending]);

  function refresh() {
    axios
      .post("http://localhost:4000/users/login", {
        username: props.userInfo.username,
        password: props.userInfo.password,
      })
      .then((results) => {
        console.log(results);
        props.updateToken(results.data.token);
        props.updateUserID(results.data.id);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }

  return (
    <div>
      <form id="username">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(event) => props.updateUsername(event)}
        ></input>
      </form>
      <form id="password">
        <label for="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={(event) => props.updatePassword(event)}
        ></input>
      </form>
      <button
        onClick={() => {
          refresh();
        }}
      >
        Login
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserReducer,
    userToken: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  updatePassword: (e) => updatePassword(e),
  updateUsername: (e) => updateUsername(e),
  updateToken: (e) => updateToken(e),
  updateUserID: (e) => updateUserID(e),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
