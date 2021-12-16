export const updateCollectionTitle = (e) => {
  console.log("updating collectionTitle: ", e);
  return {
    type: "UPDATE_COLLECTIONTITLE",
    payload: e.target.value,
  };
};
export const updateCollectionCreator = (e) => {
  console.log("updating collectionCreator: ", e);
  return {
    type: "UPDATE_COLLECTIONCREATOR",
    payload: e,
  };
};
export const updateCollectionLinks = (e) => {
  console.log("updating collection links: ", e);
  return {
    type: "UPDATE_COLLECTIONLINKS",
    payload: e.target.value,
  };
};
