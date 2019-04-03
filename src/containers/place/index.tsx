import * as React from "react";
import { IPlace } from "../../model/place";
import Rater from "../rater";
import { PlaceBox, PlaceInfo, PlaceMarker } from "./place.css";

interface IPlaceProfileProps {
  place: IPlace;
}

const PlaceProfile: React.FC<IPlaceProfileProps> = ({ place }) => {
  return (
    <PlaceBox>
      <Rater key={`${place.name}-rater`} placeID={place.placeID} />
      <PlaceMarker image={place.photo} />
      <PlaceInfo>
        <a href={`https://foursquare.com/v/${place.placeID}`}>{place.name}</a>
      </PlaceInfo>
    </PlaceBox>
  );
};

export default PlaceProfile;
