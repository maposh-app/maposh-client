import * as _ from "lodash";

const getMaposhScore = (placeID: string) => `
  query {
    getPlaceInfo(placeID: "${placeID}") {
      upvoteCount
    }
  }
`;

const meInfoFragment = `
meInfo {
  favourites {
    placeID
  }
  dislikes {
    placeID
  }
}`;

const getMaposhPlaces = (city: string) => `
  query {
    ${meInfoFragment}
    getPlaces(city: "${_.camelCase(city)}") {
      placeID
      name
      city
      upvoteCount
    }
  }
`;

export default { getMaposhScore, getMaposhPlaces, meInfoFragment };
