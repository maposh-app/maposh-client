import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { IPlace } from "../../model/place";
import { MaposhState } from "../../service/store";
import {
  dislike,
  forgetLike,
  forgetDislike,
  like,
  updatePlaces
} from "../../service/store/map/actions";
import { IMapState } from "../../service/store/map/types";
import { updatePreferences } from "../../service/store/system/actions";
import { ISystemState } from "../../service/store/system/types";
import { DownArrow, RatingContainer, RatingCount, UpArrow } from "./rater.css";

interface IRaterProps {
  system: ISystemState;
  map: IMapState;
  updatePreferences: typeof updatePreferences;
  updatePlaces: typeof updatePlaces;
  like: (
    placeID: string,
    name: string,
    longitude?: number,
    latitude?: number
  ) => void;
  dislike: (
    placeID: string,
    name: string,
    longitude?: number,
    latitude?: number
  ) => void;
  forgetLike: (placeID: string) => void;
  forgetDislike: (placeID: string) => void;
  place: IPlace;
}

const BaseRater: React.FC<IRaterProps & RouteComponentProps> = props => {
  const getVote = () =>
    props.system.likes.has(props.place.placeID)
      ? 1
      : props.system.dislikes.has(props.place.placeID)
      ? -1
      : 0;

  const getScore = () =>
    props.map.placesCache[props.place.placeID].upvoteCount || 0;

  const [vote, setVote] = React.useState(getVote());
  const [score, setScore] = React.useState(getScore());

  const shouldVote = (direction: number) => {
    const hasAlreadyVotedTheSame = direction === vote;

    const extra = !hasAlreadyVotedTheSame && vote !== 0 ? direction : 0;
    const change = extra + (hasAlreadyVotedTheSame ? -direction : direction);

    setVote(hasAlreadyVotedTheSame ? 0 : direction);
    setScore(score + change);
    window.setTimeout(() => {
      setScore(getScore());
    }, 3000);
    return !hasAlreadyVotedTheSame;
  };

  const upvote = () => {
    if (props.system.isAuthenticated) {
      if (shouldVote(1)) {
        props.like(
          props.place.placeID,
          props.place.name,
          props.place.longitude,
          props.place.latitude
        );
      } else {
        props.forgetLike(props.place.placeID);
      }
    } else {
      props.history.push("/login");
    }
  };

  const downvote = () => {
    if (props.system.isAuthenticated) {
      if (shouldVote(-1)) {
        props.dislike(
          props.place.placeID,
          props.place.name,
          props.place.longitude,
          props.place.latitude
        );
      } else {
        props.forgetDislike(props.place.placeID);
      }
    } else {
      props.history.push("/login");
    }
  };

  return (
    <RatingContainer>
      <UpArrow active={vote === 1} onClick={upvote} />
      <RatingCount>{score}</RatingCount>
      <DownArrow active={vote === -1} onClick={downvote} />
    </RatingContainer>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

const Rater = connect(
  mapStateToProps,
  { updatePreferences, updatePlaces, like, dislike, forgetLike, forgetDislike }
)(withRouter(BaseRater));

export default Rater;
