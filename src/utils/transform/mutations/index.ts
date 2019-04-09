const like = (placeID: string, name: string, city: string, extra?: number) => `
  mutation {
    like(placeID: "${placeID}", name: "${name}", city: "${city}", extra: ${
  extra ? extra : 0
})
  }
`;

const forgetLike = (placeID: string) => `
  mutation {
    forget(placeID: "${placeID}", score: -1)
  }
`;

const dislike = (
  placeID: string,
  name: string,
  city: string,
  extra?: number
) => `
  mutation {
    dislike(placeID: "${placeID}", name: "${name}", city: "${city}", extra: ${
  extra ? extra : 0
})
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
