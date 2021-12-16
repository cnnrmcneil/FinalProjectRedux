import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import UserCard from "./components/UserCard";
import AllCollectionCard from "./components/AllCollectionCard";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import CreateCollection from "./components/CreateCollection";
import ActiveCollectionCard from "./components/ActiveCollectionCard";
import About from "./components/About";
import UserPage from "./components/UserPage";
import Player from "./components/Player";
import { Switch, Route, Link } from "react-router-dom";

function App(props) {
  const [token, setToken] = useState("");

  return (
    <div>
      <header className="header">
        <ul className="headerItems">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <Login />
          <CreateAccount />
        </ul>
      </header>
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return (
              <div className="twoBox">
                <div className="leftBox">
                  {props.userToken.token ? (
                    <UserCard className="userCard" />
                  ) : (
                    <div />
                  )}
                  {props.userToken.token ? (
                    <div>
                      <AllCollectionCard className="allCollectionCard" />
                      <CreateCollection className="createCollection" />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="rightBox">
                  <ActiveCollectionCard className="activeCollectionCard" />
                  <Player />
                </div>
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userToken: state.LoginReducer,
    activeCollection: state.CollectionReducer,
  };
};

export default connect(mapStateToProps)(App);
