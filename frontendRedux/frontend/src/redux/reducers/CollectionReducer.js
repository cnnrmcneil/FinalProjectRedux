const initialState = {
  collections: [],
  activeCollection: [],
  activeLink: "",
};

export const CollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_COLLECTIONS":
      return {
        ...state,
        collections: action.payload,
      };
    case "UPDATE_ACTIVECOLLECTION":
      console.log("Active collection updated", state);
      return {
        ...state,
        activeCollection: action.payload,
      };
    case "UPDATE_ACTIVELINK":
      console.log("Active link updated", state);
      return {
        ...state,
        activeLink: action.payload,
      };
    default:
      return state;
  }
};
