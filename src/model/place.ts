export interface IPlace {
  name: string;
  placeID: string;
  city: string;
  address: string;
  longitude: number;
  latitude: number;
  color: string;
  foursquareRating?: number;
  upvoteCount?: number;
  photo?: string;
}
