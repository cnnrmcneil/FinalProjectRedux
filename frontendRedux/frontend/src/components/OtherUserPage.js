import React from "react";
import { connect } from "react-redux";
function OtherUserPage(props) {
  return (
    <div>
      <p>This page loaded</p>
      <p>{props.userInfo.otherUserID}</p>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.UserReducer,
  };
};

export default connect(mapStateToProps)(OtherUserPage);
