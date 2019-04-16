import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import Spinner from "react-spinkit";
import config from "../../config";
import { IPlace } from "../../model/place";
import { MaposhState } from "../../service/store";
import { dislike, like } from "../../service/store/map/actions";
import { IMapState } from "../../service/store/map/types";
import { ISystemState } from "../../service/store/system/types";
import { DownArrow, RatingContainer, RatingCount, UpArrow } from "./rater.css";

interface IRaterProps {
  system: ISystemState;
  map: IMapState;
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

  const [isLoading, setIsLoading] = React.useState(false);

  const like = React.useCallback(
    _.debounce(
      function() {
        props.like(
          props.place.placeID,
          props.place.name,
          props.place.longitude,
          props.place.latitude
        );
        window.setTimeout(() => setIsLoading(false), 1200);
      },
      400,
      { leading: true, trailing: false }
    ),
    []
  );
  const dislike = React.useCallback(
    _.debounce(
      function() {
        props.dislike(
          props.place.placeID,
          props.place.name,
          props.place.longitude,
          props.place.latitude
        );
        window.setTimeout(() => setIsLoading(false), 1200);
      },
      400,
      {
        leading: true,
        trailing: false
      }
    ),
    []
  );

  const upvote = () => {
    if (props.system.isAuthenticated) {
      setIsLoading(true);
      like();
    } else {
      props.history.push("/login");
    }
  };

  const downvote = () => {
    if (props.system.isAuthenticated) {
      setIsLoading(true);
      dislike();
    } else {
      props.history.push("/login");
    }
  };

  React.useEffect(() => {
    return () => {
      like.cancel();
      dislike.cancel();
    };
  }, []);

  const vote = getVote();
  const score = getScore();

  return (
    <RatingContainer>
      {isLoading ? (
        <Spinner name="chasing-dots" color={config.theme.colorTender} />
      ) : (
        <>
          <UpArrow active={vote === 1} onClick={upvote} />
          <RatingCount>{score}</RatingCount>
          <DownArrow active={vote === -1} onClick={downvote} />
        </>
      )}
    </RatingContainer>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

const Rater = connect(
  mapStateToProps,
  { like, dislike }
)(withRouter(BaseRater));

export default Rater;
