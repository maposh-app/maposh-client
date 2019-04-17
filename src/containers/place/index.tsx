import * as React from "react";
import { IPlace } from "../../model/place";
import Rater from "../rater";
import { PlaceBox, PlaceInfo, PlaceLink, PlaceMarker } from "./place.css";

interface IPlaceProfileProps {
  place?: IPlace;
}

const PlaceProfile: React.FC<IPlaceProfileProps> = ({ place }) => {
  return (
    <PlaceBox>
      {place ? (
        <>
          <Rater key={`${place.name}-rater`} place={place} />
          <PlaceLink
            href={`https://foursquare.com/v/${place.placeID}`}
            target="_blank"
          >
            <PlaceInfo>{place.name}</PlaceInfo>
            {place.photo && (
              <PlaceMarker style={{ marginLeft: "auto" }} image={place.photo} />
            )}
          </PlaceLink>
        </>
      ) : null}
    </PlaceBox>
  );
};

export default PlaceProfile;
