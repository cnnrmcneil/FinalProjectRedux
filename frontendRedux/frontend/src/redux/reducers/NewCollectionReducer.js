const initialState = {
  collectionTitle: "",
  collectionCreator: "",
  collectionLinks: [],
};

export const NewCollectionReducer = (state = initialState, action) => {
  console.log("this is state", state);
  switch (action.type) {
    case "UPDATE_COLLECTIONTITLE":
      console.log("state of collectiontitle", state);
      return {
        ...state,
        collectionTitle: action.payload,
      };
    case "UPDATE_COLLECTIONCREATOR":
      console.log("state of collectioncreator", state);
      return {
        ...state,
        collectionCreator: action.payload,
      };
    case "UPDATE_COLLECTIONLINKS":
      console.log("state of collection links", state);
      return {
        ...state,
        collectionLinks: action.payload,
      };
    default:
      return state;
  }
};
