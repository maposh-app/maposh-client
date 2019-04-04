import * as React from "react";
import { IPlace } from "../../model/place";
import Rater from "../rater";
import { PlaceBox, PlaceInfo, PlaceLink, PlaceMarker } from "./place.css";

interface IPlaceProfileProps {
  place: IPlace;
}

const PlaceProfile: React.FC<IPlaceProfileProps> = ({ place }) => {
  return (
    <PlaceBox>
      <Rater key={`${place.name}-rater`} placeID={place.placeID} />
      <PlaceLink
        href={`https://foursquare.com/v/${place.placeID}`}
        target="_blank"
      >
        <PlaceMarker image={place.photo} />
        <PlaceInfo>{place.name}</PlaceInfo>
      </PlaceLink>
    </PlaceBox>
  );
};

export default PlaceProfile;
