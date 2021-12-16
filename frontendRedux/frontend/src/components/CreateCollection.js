import React, { useEffect } from "react";
import { connect } from "react-redux";
// import {
//   updateCollections,
//   updateActiveCollection,
// } from "../redux/actionCreator/collectionActions";
import {
  updateCollectionTitle,
  updateCollectionCreator,
  updateCollectionLinks,
} from "../redux/actionCreator/newCollectionActions";

import axios from "axios";

function CreateCollection(props) {
  const [count, setCount] = React.useState(0);

  const headers = { Authorization: "Bearer " + props.tokenInfo.token };

  useEffect(() => {
    console.log("useeffect ran once, this is props", props);
    axios
      .post(
        "http://localhost:4000/users/create-collection",
        {
          creator: props.userInfo.userID,
          title: props.newCollectionInfo.collectionTitle,
          links: props.newCollectionInfo.collectionLinks,
        },
        { headers }
      )
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, [count]);
  return (
    <div>
      <form id="collectionName">
        <label for="collectionName">Collection Name</label>
        <input
          type="text"
          id="collectionName"
          name="collectionName"
          onChange={(event) => props.updateCollectionTitle(event)}
        ></input>
      </form>
      <form id="collectionLinks">
        <label for="collectionLinks">Links</label>
        <input
          type="text"
          id="collectionLinks"
          name="collectionLinks"
          onChange={(event) => props.updateCollectionLinks(event)}
        ></input>
      </form>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Submit Collection
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserReducer,
    // collectionInfo: state.CollectionReducer,
    newCollectionInfo: state.NewCollectionReducer,
    tokenInfo: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  // updateCollections: (e) => updateCollections(e),
  // updateActiveCollection: (e) => updateActiveCollection(e),
  updateCollectionTitle: (e) => updateCollectionTitle(e),
  updateCollectionCreator: (e) => updateCollectionCreator(e),
  updateCollectionLinks: (e) => updateCollectionLinks(e),
  // collection links needs to be an
  // how do i submit arrays to mongoDB
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection);
