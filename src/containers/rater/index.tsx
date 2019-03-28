import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { API, graphqlOperation } from "aws-amplify";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { MaposhState } from "../../service/store";
import { IMapState } from "../../service/store/map/types";
import { ISystemState } from "../../service/store/system/types";
import { mutations } from "../../utils/transform";
import { DownArrow, RatingContainer, RatingCount, UpArrow } from "./rater.css";

interface IRaterProps {
  system: ISystemState;
  map: IMapState;
  placeID: string;
  currentScore?: number;
}

const BaseRater: React.FC<IRaterProps & RouteComponentProps> = ({
  placeID,
  currentScore,
  system,
  map,
  history
}) => {
  const [vote, setVote] = React.useState(0);
  const [score, setScore] = React.useState(currentScore || 0);

  const draw = (direction: number) => {
    const isCastedAlready = direction === vote;
    setVote(isCastedAlready ? 0 : direction);
    return !isCastedAlready;
  };

  const upvoteBackend = () => {
    (API.graphql(
      graphqlOperation(mutations.upvotePlace(placeID, map.location.city))
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
  };
  const downvoteBackend = () => {
    (API.graphql(
      graphqlOperation(mutations.downvotePlace(placeID, map.location.city))
    ) as Promise<GraphQLResult>).catch(err => {
      console.log(err);
    });
  };

  const upvote = () => {
    if (system.isAuthenticated) {
      if (draw(1)) {
        upvoteBackend();
      } else {
        downvoteBackend();
      }
    } else {
      history.push("/login");
    }
  };

  const downvote = () => {
    if (system.isAuthenticated) {
      if (draw(-1)) {
        downvoteBackend();
      } else {
        upvoteBackend();
      }
    } else {
      history.push("/login");
    }
  };

  return (
    <RatingContainer>
      <UpArrow active={vote === 1} onClick={upvote} />
      <RatingCount>{score + vote}</RatingCount>
      <DownArrow active={vote === -1} onClick={downvote} />
    </RatingContainer>
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system,
  map: state.map
});

const Rater = connect(mapStateToProps)(withRouter(BaseRater));

export default Rater;
