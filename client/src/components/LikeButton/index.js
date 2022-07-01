import { useContext } from "react";
import styled from "styled-components";

import Heart from "./Heart";
import PoppingCircle from "./PoppingCircle";

const PARTICLE_COLORS = ["#e53935", "#1e88e5", "#43a047", "#fdd835", "#fb8c00"];
const LikeButton = ({ size = 40, isLiked }) => {
  console.log(isLiked, "index");
  const heartSize = size * 0.7;

  return (
    <Wrapper style={{ width: size, height: size }}>
      <Heart width={heartSize} isLiked={isLiked} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
