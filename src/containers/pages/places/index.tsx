import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NamedModal } from "../../../components/modal";
import { MaposhState } from "../../../service/store";
import { updatePlaces, updateRank } from "../../../service/store/map/actions";
import { IMapState } from "../../../service/store/map/types";
import { updatePreferences } from "../../../service/store/system/actions";
import { ISystemState } from "../../../service/store/system/types";
import Rater from "../../rater";
import { PlacesList, PlacesListItem, PlacesRanking } from "./places.css";
import PlaceProfile from "../../place";
import { IPlace } from "../../../model/place";

interface IPlaceProps {
  system: ISystemState;
  map: IMapState;
  updatePreferences: typeof updatePreferences;
  updatePlaces: typeof updatePlaces;
  updateRank: () => void;
}

const BasePlaces: React.FC<IPlaceProps> = props => {
  const { t } = useTranslation();

  React.useEffect(() => {
    console.log("Updating...")
    props.updateRank();
  }, []);
  const { maposhPlaces, placesCache } = props.map;
  const places = Array.from(maposhPlaces).map((placeID: string) => {
    return placesCache[placeID];
  });
  places.sort((first, second) => {
    if (first.upvoteCount !== undefined && second.upvoteCount !== undefined) {
      return -first.upvoteCount + second.upvoteCount;
    } else {
      return 1;
    }
  });

  return (
    <PlacesRanking>
      <PlacesList>
        {places.map((place: IPlace) => {
          if (place) {
            return (
              <PlacesListItem key={`place-${place.placeID}`}>
                <PlaceProfile place={place} />
              </PlacesListItem>
            );
          }
        })}
      </PlacesList>
    </PlacesRanking>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

const BasePlacesWithState = connect(
  mapStateToProps,
  { updatePreferences, updatePlaces, updateRank }
)(BasePlaces);

const Places = withRouter(NamedModal("places", <BasePlacesWithState />));

export default Places;
