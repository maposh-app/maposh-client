const upvotePlace = (placeID: string, name: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", name: "${name}", city: "${city}", score: 1)
    like(placeID: "${placeID}", name: "${name}", city: "${city}")
  }
`;

const forgetUpvote = (placeID: string, name: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", name: "${name}", city: "${city}", score: -1)
    forget(placeID: "${placeID}")
  }
`;

const forgetDownvote = (placeID: string, name: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", name: "${name}", city: "${city}", score: 1)
    forget(placeID: "${placeID}")
  }
`;

const downvotePlace = (placeID: string, name: string, city: string) => `
  mutation {
    ratePlace(placeID: "${placeID}", name: "${name}", city: "${city}", score: -1)
    dislike(placeID: "${placeID}")
  }
`;

export default {
  upvotePlace,
  downvotePlace,
  forgetUpvote,
  forgetDownvote
};
