import React from "react";
import { connect } from "react-redux";
import { updateActiveLink } from "../redux/actionCreator/collectionActions";

function ActiveCollectionCard(props) {
  function linkToEmbed(link) {
    let position = link.replace("watch?v=", "embed/");
    props.updateActiveLink(position);
  }

  return (
    <div>
      {/* {console.log("rerendering active collection card")} */}
      {/* {console.log("this is active collection", props.collections)} */}
      <h2>{props.collections.activeCollection?.title}</h2>
      <p>{props.collections.activeCollection?.creator}</p>
      <ol>
        {props.collections.activeCollection ? (
          props.collections.activeCollection.links?.map((link, index) => {
            return (
              <li key={index}>
                {link}{" "}
                <button
                  onClick={() => {
                    linkToEmbed(link);
                  }}
                >
                  Play
                </button>
              </li>
            );
          })
        ) : (
          <p>Please select a collection</p>
        )}
      </ol>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    collections: state.CollectionReducer,
  };
};

const mapDispatchToProps = {
  updateActiveLink: (e) => updateActiveLink(e),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveCollectionCard);
