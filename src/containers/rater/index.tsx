import * as React from "react";
import { DownArrow, RatingContainer, RatingCount, UpArrow } from "./rater.css";

const Rater: React.FC = () => {
  const [vote, setVote] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const draw = (direction: number) => {
    setVote(direction === vote ? 0 : direction);
    setScore(direction === vote ? score - vote : score + vote);
  };
  return (
    <RatingContainer>
      <UpArrow active={vote === 1} onClick={() => draw(1)} />
      <RatingCount>1</RatingCount>
      <DownArrow active={vote === -1} onClick={() => draw(-1)} />
    </RatingContainer>
  );
};

export default Rater;
