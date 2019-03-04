export type ICity = string;
export type IBoundingBox = [number, number, number, number];
export interface ILocation {
  city: ICity;
  boundingBox: IBoundingBox;
}
