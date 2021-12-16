import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  updatePassword,
  updateUsername,
} from "../redux/actionCreator/userActions";

import { updateToken } from "../redux/actionCreator/loginActions";
import axios from "axios";

function CreateAccount(props) {
  const [isSending, setIsSending] = React.useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:4000/users/sign-up", {
        username: props.userInfo2.username,
        password: props.userInfo2.password,
      })
      .then((results) => {
        if (results.data.token) {
          props.updateToken(results.data.token);
        } else {
          setIsSending(false);
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, [isSending]);

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
          setIsSending(true);
        }}
      >
        SignUp
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo2: state.UserReducer,
    userToken2: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  updatePassword: (e) => updatePassword(e),
  updateUsername: (e) => updateUsername(e),
  updateToken: (e) => updateToken(e),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
