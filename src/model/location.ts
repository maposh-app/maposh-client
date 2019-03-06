export type ICity = string;

export interface ICityLabel {
  value: ICity;
  label: string;
}

export type IBoundingBox = [number, number, number, number, number, number];

export interface ILocation {
  city: ICity;
  boundingBox: IBoundingBox;
}
