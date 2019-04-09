const like = (placeID: string, name: string, city: string) => `
  mutation {
    like(placeID: "${placeID}", name: "${name}", city: "${city}")
  }
`;

const forgetLike = (placeID: string) => `
  mutation {
    forget(placeID: "${placeID}", score: -1)
  }
`;

const dislike = (placeID: string, name: string, city: string) => `
  mutation {
    dislike(placeID: "${placeID}", name: "${name}", city: "${city}")
  }
`;

const forgetDislike = (placeID: string) => `
  mutation {
    forget(placeID: "${placeID}", score: 1)
  }
`;

export default {
  like,
  dislike,
  forgetLike,
  forgetDislike
};
