import React from "react";
import { connect } from "react-redux";

function UserCard(props) {
  return (
    <div>
      <h1>{props.userInfo.username} page</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserReducer,
  };
};

export default connect(mapStateToProps)(UserCard);
