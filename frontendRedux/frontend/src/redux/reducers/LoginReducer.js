const initialState = {
  token: "",
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      console.log(state);
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
