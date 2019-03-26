import * as React from "react";
import { DownArrow, RatingContainer, RatingCount, UpArrow } from "./rater.css";

const Rater: React.FC = () => {
//   const { vote, setVote } = React.useState(0);
//   const { score, setScore } = React.useState(0);
  return (
    <RatingContainer>
      <UpArrow />
      <RatingCount>1</RatingCount>
      <DownArrow />
    </RatingContainer>
  );
};

export default Rater;
