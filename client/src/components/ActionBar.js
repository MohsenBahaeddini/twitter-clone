import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import styled from "styled-components";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import LikeButton from "./LikeButton";
import Action from "./Action";
import Heart from "./LikeButton/Heart";

const ActionBar = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);

  const handleToggleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setNumOfLikes(numOfLikes + 1);
    } else {
      setIsLiked(false);
      setNumOfLikes(numOfLikes - 1);
    }
  };
  console.log(isLiked, "+++++");
  return (
    <Div>
      <BiMessageRounded></BiMessageRounded>
      <AiOutlineRetweet></AiOutlineRetweet>
      <Action
        color="rgb(224, 36, 94)"
        size={40}
        onClick={() => {
          console.log("clicked");
          handleToggleLike();
        }}
        isLiked={isLiked}
      >
        <LikeButton
          isLiked={isLiked}
          onClick={() => {
            console.log("clicked");
            handleToggleLike();
          }}
        >
          <Heart isLiked={isLiked}></Heart>
        </LikeButton>
      </Action>

      <FiShare></FiShare>
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  margin: 0 35px 20px 100px;
`;
const Button = styled.button`
  background-color: white;
  border: none;
`;
export default ActionBar;
