import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { updateActiveLink } from "../redux/actionCreator/collectionActions";

function ActiveCollectionCard(props) {
  const [newLink, setNewLink] = React.useState("");
  function linkToEmbed(link) {
    let position = link.replace("watch?v=", "embed/");
    props.updateActiveLink(position);
  }

  const headers = { Authorization: "Bearer " + props.userToken.token };

  function deleteLink(theLink) {
    console.log("this is the link", theLink);
    axios
      .post(
        "https://cnnrmcnl-youtube.herokuapp.com/users/delete-link",
        {
          link: theLink,
          collectionID: props.collections.activeCollection._id,
        },
        { headers }
      )
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  }

  function addLink(theLink) {
    console.log(
      "this is the link",
      theLink,
      "this is collectionID",
      props.collections.activeCollection._id
    );
    axios
      .post(
        "https://cnnrmcnl-youtube.herokuapp.com/users/add-link",
        {
          link: theLink,
          collectionID: props.collections.activeCollection._id,
        },
        { headers }
      )
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  }

  function deleteCollection() {
    console.log("delete function running");
    axios
      .post(
        "https://cnnrmcnl-youtube.herokuapp.com/users/delete",
        {
          collectionID: props.collections.activeCollection._id,
        },
        { headers }
      )
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }

  return (
    <div className="activeCollectionCard">
      {/* {console.log("rerendering active collection card")} */}
      {/* {console.log("this is active collection", props.collections)} */}
      <h2>{props.collections.activeCollection?.title}</h2>
      <p>Created by: {props.collections.activeCollection?.creator}</p>
      <ol>
        {props.collections.activeCollection ? (
          props.collections.activeCollection.links?.map((link, index) => {
            return (
              <li key={index} class>
                <button
                  className="songbutton"
                  onClick={() => {
                    linkToEmbed(link);
                  }}
                >
                  {link}{" "}
                </button>
                <button
                  className="buttonCollection"
                  onClick={() => {
                    deleteLink(link);
                  }}
                >
                  Delete Link
                </button>
              </li>
            );
          })
        ) : (
          <p>Please select a collection</p>
        )}
      </ol>
      <form id="addlink">
        <label for="addlink">Add link</label>
        <input
          type="text"
          id="addlink"
          name="addlink"
          newLink={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        ></input>
      </form>
      <button
        className="buttonCollection"
        onClick={() => {
          addLink(newLink);
        }}
      >
        Submit Link
      </button>
      <button
        className="buttonCollection"
        onClick={() => {
          deleteCollection();
        }}
      >
        Delete Collection
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    collections: state.CollectionReducer,
    userToken: state.LoginReducer,
  };
};

const mapDispatchToProps = {
  updateActiveLink: (e) => updateActiveLink(e),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveCollectionCard);
