import React from "react";
import { connect } from "react-redux";

function Player(props) {
  return (
    <div>
      <iframe
        width="420"
        height="315"
        src={props.activeCollection.activeLink}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activeCollection: state.CollectionReducer,
  };
};

export default connect(mapStateToProps)(Player);
