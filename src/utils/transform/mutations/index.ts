const getMaposhScore = (placeID: string) => `
  query {
    getPlaceInfo(placeID: "${placeID}") {
      upvoteCount
    }
  }
`;

const upvotePlace = (placeID: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", city: "${city}", score: 1)
    like(placeID: "${placeID}", city: "${city}")
  }
`;

const forgetUpvote = (placeID: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", city: "${city}", score: -1)
    forget(placeID: "${placeID}")
  }
`;

const forgetDownvote = (placeID: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", city: "${city}", score: 1)
    forget(placeID: "${placeID}")
  }
`;

const downvotePlace = (placeID: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", city: "${city}", score: -1)
    dislike(placeID: "${placeID}")
  }
`;

export default {
  upvotePlace,
  downvotePlace,
  getMaposhScore,
  forgetUpvote,
  forgetDownvote
};
