const initialState = {
  username: "",
  password: "",
  userID: "",
  collections: "",
  otherUserID: "",
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "UPDATE_USERID":
      return {
        ...state,
        userID: action.payload,
      };
    case "UPDATE_COLLECTIONS":
      return {
        ...state,
        collections: action.payload,
      };
    case "UPDATE_OTHERUSERID":
      return {
        ...state,
        otherUserID: action.payload,
      };
    default:
      return state;
  }
};
