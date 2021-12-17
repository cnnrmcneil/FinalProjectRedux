import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  updateActiveCollection,
  updateCollections,
} from "../redux/actionCreator/collectionActions";
import "../App.css";

function AllCollectionCard(props) {
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState(null);

  // useEffect(() => {
  //   console.log("Useeffect before USERID check is running");
  //   if (props.userInfo.userID) {
  //     axios
  //       .post("https://cnnrmcnl-youtube.herokuapp.com/users/find-collection", {
  //         // userID: props.userInfo.userID,
  //         userID: "61b953caaa7d81214049ee1b",
  //       })
  //       .then((results) => {
  //         props.updateCollections(results.data);
  //         setData(results.data);
  //         console.log("Axios ran, Results: ", results, "Data: ", results.data);
  //         // console.log("This is data ", data);
  //         // console.log(
  //         //   "these are the collections pulled from the user",
  //         //   props.collections
  //         // );
  //       })
  //       .catch((err) => {
  //         console.log("something went wrong", err);
  //       });
  //   }
  // }, []);
  function refresh() {
    if (props.userInfo.userID) {
      axios
        .post("https://cnnrmcnl-youtube.herokuapp.com/users/find-collection", {
          userID: props.userInfo.userID,
          // userID: "61b953caaa7d81214049ee1b",
        })
        .then((results) => {
          props.updateCollections(results.data);
          setData(results.data);
          console.log("Axios ran, Results: ", results, "Data: ", results.data);
          // console.log("This is data ", data);
          // console.log(
          //   "these are the collections pulled from the user",
          //   props.collections
          // );
        })
        .catch((err) => {
          console.log("something went wrong", err);
        });
    }
  }

  return (
    <div className="allCollectionCard">
      <h2>Collections: </h2>
      {console.log(
        "The Map function should be running",
        props.collections.collections
      )}
      {props.collections.collections ? (
        props.collections.collections.map((collection, index) => {
          return (
            <div>
              <h3 key={index}>{collection.title}</h3>
              <button
                className="buttonCollection"
                onClick={() => {
                  props.updateActiveCollection(collection);
                }}
              >
                Set Active Playlist
              </button>
              {/* {collection.links.map((link) => {
                return <p>{link}</p>; */}
              {/* })} */}
            </div>
          );
        })
      ) : (
        <p>Please Login{console.log("loading default login")}</p>
      )}
      <p></p>
      <button
        className="buttonCollection"
        onClick={() => {
          refresh();
          setCount(count + 1);
        }}
      >
        Click to update
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    collections: state.CollectionReducer,
    userInfo: state.UserReducer,
    userToken: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  updateCollections: (e) => updateCollections(e),
  updateActiveCollection: (e) => updateActiveCollection(e),
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCollectionCard);
