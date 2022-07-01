import { useState, useContext } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
// import { useHistory } from "react-router-dom";

const NewTweet = ({
  setHomeFeedStatus,
  setHomeFeedTweetById,
  homeFeedTweetById,
  setHomeFeedTweetId,
  homeFeedTweetId,
}) => {
  const [newTweet, setNewTweet] = useState("");
  const [newTweetStatus, setNewTweetStatus] = useState("idle");
  const { currentUser } = useContext(CurrentUserContext);
  // const history = useHistory();
  const [error, setError] = useState(false);
  const [color, setColor] = useState("grey");

  const MAX_CHAR = 280;
  const handleOnChange = (ev) => {
    setColor("grey");
    if (ev.target.value.length >= 225 && ev.target.value.length <= 280) {
      setColor("yellow");
    }
    if (ev.target.value.length > 280) {
      setColor("red");
    }
    setNewTweet(ev.target.value);
  };
  const handleAfterPublishTweet = () => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setHomeFeedTweetId(data.tweetIds);
        setHomeFeedTweetById(data.tweetsById);
      });
  };
  const handleSubmitTweet = (ev) => {
    ev.preventDefault();
    setHomeFeedStatus("loading");
    setNewTweet("");

    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: newTweet }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch("/api/me/home-feed")
          .then((res) => res.json())
          .then((data) => {
            setHomeFeedStatus("idle");
            setHomeFeedTweetById(...homeFeedTweetById, data.tweetsById);
          })
          .catch((test) => {
            setError(true);
            throw new Error("SOMETHING WENT WRONG, PLEASE TRY AGAIN");
          });

        handleAfterPublishTweet();
      });
  };
  return (
    <Wrapper>
      <form>
        <Div>
          <NewTweetAvatar src={currentUser.profile.avatarSrc} />
          <TextArea
            type="text"
            placeholder="What's happening?"
            value={newTweet}
            onChange={handleOnChange}
          ></TextArea>
        </Div>
        <SmallDiv>
          <CharLimit style={{ color: color }}>
            {MAX_CHAR - newTweet.length}
          </CharLimit>
          <Button
            onClick={handleSubmitTweet}
            type="submit"
            disabled={newTweet.length > 280 ? true : false}
          >
            Meow
          </Button>
        </SmallDiv>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border-bottom: 10px #eee solid;
`;

const Div = styled.div`
  display: flex;
`;
const SmallDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;
const NewTweetAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 20px;
`;
const Button = styled.button`
  font-size: 20px;
  height: 50px;
  width: 90px;
  background-color: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 4px;
  margin: 0 10px 10px 10px;
  &:disabled {
    opacity: 10%;
  }
`;
const CharLimit = styled.p`
  font-size: 20px;
  color: color;
`;
const TextArea = styled.textarea`
  padding-top: 30px;
  font-size: 20px;
  height: 200px;
  width: 850px;
  border: none;
  outline: none;
`;

export default NewTweet;
