const like = (
  placeID: string,
  name: string,
  city: string,
  longitude?: number,
  latitude?: number
) => `
  mutation {
    like(placeID: "${placeID}",
         name: "${name}",
         city: "${city}",
         longitude: ${longitude},
         latitude: ${latitude},
         )

  }
`;

const dislike = (
  placeID: string,
  name: string,
  city: string,
  longitude?: number,
  latitude?: number
) => `
  mutation {
    dislike(placeID: "${placeID}",
         name: "${name}",
         city: "${city}",
         longitude: ${longitude},
         latitude: ${latitude},
         )
  }
`;

export default {
  like,
  dislike
};
