export const updateToken = (e) => {
  console.log("updating token: ", e);
  return {
    type: "UPDATE_TOKEN",
    payload: e,
  };
};
