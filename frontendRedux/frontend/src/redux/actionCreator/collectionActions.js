export const updateCollections = (e) => {
  console.log("updating collections: ", e);
  return {
    type: "UPDATE_COLLECTIONS",
    payload: e,
  };
};
export const updateActiveCollection = (e) => {
  console.log("updating active collection: ", e);
  return {
    type: "UPDATE_ACTIVECOLLECTION",
    payload: e,
  };
};
export const updateActiveLink = (e) => {
  console.log("updating active link: ", e);
  return {
    type: "UPDATE_ACTIVELINK",
    payload: e,
  };
};
