import * as _ from "lodash";

const getMaposhScore = (placeID: string) => `
  query {
    getPlaceInfo(placeID: "${placeID}") {
      upvoteCount
      longitude
      latitude
    }
  }
`;

const meInfoFragment = `
meInfo {
  likes {
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
      longitude
      latitude
    }
  }
`;

export default { getMaposhScore, getMaposhPlaces, meInfoFragment };
