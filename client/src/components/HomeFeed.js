import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import moment from "moment";
import SmallTweet from "./SmallTweet";
import { keyframes } from "styled-components";
import NewTweet from "./NewTweet";
import ErrorScreen from "./ErrorScreen";
import LoadingSpinner from "./LoadingSpinner";

const HomeFeed = () => {
  const { status, setStatus } = useContext(CurrentUserContext);
  const [homeFeedStatus, setHomeFeedStatus] = useState("idle");
  const [homeFeedTweetId, setHomeFeedTweetId] = useState([]);
  const [homeFeedTweetById, setHomeFeedTweetById] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    setHomeFeedStatus("loading");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setHomeFeedTweetId(data.tweetIds);
        setHomeFeedTweetById(data.tweetsById);
        setHomeFeedStatus("idle");
      })
      .catch((test) => {
        setError(true);
        throw new Error("SOMETHING WENT WRONG, PLEASE TRY AGAIN");
      });
  }, []);

  if (error) {
    return <ErrorScreen />;
  }
  if (status === "loading") {
    return (
      <CenteredLoading>
        <Loading class="lds-dual-ring"></Loading>
      </CenteredLoading>
    );
  }
  if (status === "idle") {
    return (
      <Wrapper>
        <Title>Home</Title>
        <NewTweet
          setHomeFeedStatus={setHomeFeedStatus}
          setHomeFeedTweetById={setHomeFeedTweetById}
          homeFeedTweetById={homeFeedTweetById}
          setHomeFeedTweetId={setHomeFeedTweetId}
          homeFeedTweetId={homeFeedTweetId}
        />
        {homeFeedStatus === "loading" && <LoadingSpinner />}
        {homeFeedStatus === "idle" && (
          <>
            {homeFeedTweetId.map((tweetIndex) => {
              return (
                <SmallTweet
                  key={homeFeedTweetById[tweetIndex].id}
                  tweetInfo={homeFeedTweetById[tweetIndex]}
                />
              );
            })}
          </>
        )}
      </Wrapper>
    );
  }
};
const CenteredLoading = styled.div`
  display: flex;
  margin: auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  font-family: sans-serif;
  border: 1px #ddd solid;
  width: 1000px;
`;
const Title = styled.div`
  border-bottom: 1px #ddd solid;
  padding: 20px 0 20px 40px;
  font-size: 28px;
  font-weight: bold;
`;
const animation = keyframes`
  
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  
`;

const Loading = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 34px;
    height: 34px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #aaa;
    border-color: #aaa transparent #aaa transparent;
    animation: ${animation} 1.2s linear infinite;
  }
`;
export default HomeFeed;
