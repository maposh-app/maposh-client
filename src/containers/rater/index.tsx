import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { API, graphqlOperation } from "aws-amplify";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
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
  placeID: string;
}

const BaseRater: React.FC<IRaterProps & RouteComponentProps> = props => {
  const [vote, setVote] = React.useState(
    props.system.favourites.has(props.placeID)
      ? 1
      : props.system.dislikes.has(props.placeID)
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
        mutations.upvotePlace(props.placeID, props.map.location.city)
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const newPlaces = props.map.places;
    const rating = newPlaces[props.placeID].maposhRating;
    newPlaces[props.placeID].maposhRating = rating ? rating + 1 : 1;
    props.updatePlaces({ places: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    dislikes.delete(props.placeID);
    props.updatePreferences({
      favourites: favourites.add(props.placeID),
      dislikes
    });
  };

  const forgetLike = () => {
    (API.graphql(
      graphqlOperation(
        mutations.forgetUpvote(props.placeID, props.map.location.city)
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const newPlaces = props.map.places;
    const rating = newPlaces[props.placeID].maposhRating;
    newPlaces[props.placeID].maposhRating = rating ? rating - 1 : 0;
    props.updatePlaces({ places: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    favourites.delete(props.placeID);
    props.updatePreferences({
      favourites,
      dislikes
    });
  };

  const dislike = () => {
    (API.graphql(
      graphqlOperation(
        mutations.downvotePlace(props.placeID, props.map.location.city)
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const newPlaces = props.map.places;
    const rating = newPlaces[props.placeID].maposhRating;
    newPlaces[props.placeID].maposhRating = rating ? rating - 1 : -1;
    props.updatePlaces({ places: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    favourites.delete(props.placeID);
    props.updatePreferences({
      favourites,
      dislikes: dislikes.add(props.placeID)
    });
  };

  const forgetDislike = () => {
    (API.graphql(
      graphqlOperation(
        mutations.forgetDownvote(props.placeID, props.map.location.city)
      )
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
    const newPlaces = props.map.places;
    const rating = newPlaces[props.placeID].maposhRating;
    newPlaces[props.placeID].maposhRating = rating ? rating + 1 : 0;
    props.updatePlaces({ places: newPlaces });

    const favourites = props.system.favourites;
    const dislikes = props.system.dislikes;
    dislikes.delete(props.placeID);
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

  const score = props.map.places[props.placeID].maposhRating || 0;
  return (
    <RatingContainer>
      <UpArrow
        active={props.system.favourites.has(props.placeID)}
        onClick={upvote}
      />
      <RatingCount>{score}</RatingCount>
      <DownArrow
        active={props.system.dislikes.has(props.placeID)}
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
