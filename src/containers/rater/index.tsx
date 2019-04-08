import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { API, graphqlOperation } from "aws-amplify";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { IPlace } from "../../model/place";
import { MaposhState } from "../../service/store";
import { updatePlaces } from "../../service/store/map/actions";
import { IMapState } from "../../service/store/map/types";
import { updatePreferences } from "../../service/store/system/actions";
import { ISystemState } from "../../service/store/system/types";
import { mutations } from "../../utils/transform";
import { DownArrow, RatingContainer, RatingCount, UpArrow } from "./rater.css";

interface IRaterProps {
  system: ISystemState;
  map: IMapState;
  updatePreferences: typeof updatePreferences;
  updatePlaces: typeof updatePlaces;
  place: IPlace;
}

const BaseRater: React.FC<IRaterProps & RouteComponentProps> = props => {
  const [vote, setVote] = React.useState(
    props.system.favourites.has(props.place.placeID)
      ? 1
      : props.system.dislikes.has(props.place.placeID)
      ? -1
      : 0
  );

  const draw = (direction: number) => {
    const isCastedAlready = direction === vote;
    setVote(isCastedAlready ? 0 : direction);
    return !isCastedAlready;
  };

  const like = () => {
    (API.graphql(
      graphqlOperation(
        mutations.upvotePlace(
          props.place.placeID,
          props.place.name,
          props.map.location.city
        )
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const maposhPlaces = props.map;
    const newPlaces = maposhPlaces.placesCache;
    const rating = newPlaces[props.place.placeID].upvoteCount;
    newPlaces[props.place.placeID].upvoteCount = rating ? rating + 1 : 1;
    props.updatePlaces({ ...maposhPlaces, placesCache: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    dislikes.delete(props.place.placeID);
    props.updatePreferences({
      favourites: favourites.add(props.place.placeID),
      dislikes
    });
  };

  const forgetLike = () => {
    (API.graphql(
      graphqlOperation(
        mutations.forgetUpvote(
          props.place.placeID,
          props.place.name,
          props.map.location.city
        )
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const maposhPlaces = props.map;
    const newPlaces = maposhPlaces.placesCache;
    const rating = newPlaces[props.place.placeID].upvoteCount;
    newPlaces[props.place.placeID].upvoteCount = rating ? rating - 1 : -1;
    props.updatePlaces({ ...maposhPlaces, placesCache: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    favourites.delete(props.place.placeID);
    props.updatePreferences({
      favourites,
      dislikes
    });
  };

  const dislike = () => {
    (API.graphql(
      graphqlOperation(
        mutations.downvotePlace(
          props.place.placeID,
          props.place.name,
          props.map.location.city
        )
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const maposhPlaces = props.map;
    const newPlaces = maposhPlaces.placesCache;
    const rating = newPlaces[props.place.placeID].upvoteCount;
    newPlaces[props.place.placeID].upvoteCount = rating ? rating - 1 : -1;
    props.updatePlaces({ ...maposhPlaces, placesCache: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    favourites.delete(props.place.placeID);
    props.updatePreferences({
      favourites,
      dislikes: dislikes.add(props.place.placeID)
    });
  };

  const forgetDislike = () => {
    (API.graphql(
      graphqlOperation(
        mutations.forgetDownvote(
          props.place.placeID,
          props.place.name,
          props.map.location.city
        )
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const maposhPlaces = props.map;
    const newPlaces = maposhPlaces.placesCache;
    const rating = newPlaces[props.place.placeID].upvoteCount;
    newPlaces[props.place.placeID].upvoteCount = rating ? rating + 1 : 1;
    props.updatePlaces({ ...maposhPlaces, placesCache: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    dislikes.delete(props.place.placeID);
    props.updatePreferences({
      favourites,
      dislikes
    });
  };

  const upvote = () => {
    if (props.system.isAuthenticated) {
      if (draw(1)) {
        like();
      } else {
        forgetLike();
      }
    } else {
      props.history.push("/login");
    }
  };

  const downvote = () => {
    if (props.system.isAuthenticated) {
      if (draw(-1)) {
        dislike();
      } else {
        forgetDislike();
      }
    } else {
      props.history.push("/login");
    }
  };

  const score = props.map.placesCache[props.place.placeID].upvoteCount || 0;
  return (
    <RatingContainer>
      <UpArrow
        active={props.system.favourites.has(props.place.placeID)}
        onClick={upvote}
      />
      <RatingCount>{score}</RatingCount>
      <DownArrow
        active={props.system.dislikes.has(props.place.placeID)}
        onClick={downvote}
      />
    </RatingContainer>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

const Rater = connect(
  mapStateToProps,
  { updatePreferences, updatePlaces }
)(withRouter(BaseRater));

export default Rater;
