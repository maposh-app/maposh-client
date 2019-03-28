const getMaposhScore = (placeID: string) => `
  query {
    getPlaceInfo(placeID: "${placeID}") {
      upvoteCount
    }
  }
`;

const addPlace = (placeID: string, city: string) => `
  mutation {
    addPlace(placeID: "${placeID}", city: "${city}")
  }
`;

const upvotePlace = (placeID: string, city: string) => `
  mutation {
    upvotePlace(placeID: "${placeID}", city: "${city}")
  }
`;

const downvotePlace = (placeID: string, city: string) => `
  mutation {
    downvotePlace(placeID: "${placeID}", city: "${city}")
  }
`;

export default { addPlace, upvotePlace, downvotePlace, getMaposhScore };
