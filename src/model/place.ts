export interface IPlace {
  name: string;
  placeID: string;
  city: string;
  address: string;
  longitude: number;
  latitude: number;
  color: string;
  rating?: number;
  maposhRating?: number;
  photo?: string;
}
