export const updateUsername = (e) => {
  console.log("updating username: ", e);
  return {
    type: "UPDATE_USERNAME",
    payload: e.target.value,
  };
};
export const updatePassword = (e) => {
  console.log("updating password: ", e);
  return {
    type: "UPDATE_PASSWORD",
    payload: e.target.value,
  };
};
export const updateUserID = (e) => {
  console.log("updating userID: ", e);
  return {
    type: "UPDATE_USERID",
    payload: e,
  };
};
export const updateUserCollections = (e) => {
  console.log("updating userCollections: ", e);
  return {
    type: "UPDATE_USERCOLLECTIONS",
    payload: e,
  };
};
