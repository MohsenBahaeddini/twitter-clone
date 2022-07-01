import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { Link } from "react-router-dom";
import ErrorScreen from "./ErrorScreen";
import moment from "moment";

const TweetDetails = () => {
  const [tweetDetails, setTweetDetails] = useState({});
  const [tweetDetailsStatus, setTweetDetailsStatus] = useState("loading");
  const [error, setError] = useState(false);
  const formattedTimestamp = moment(tweetDetails.timestamp).format(
    "h:mm A, MMM DD YYYY"
  );
  console.log(formattedTimestamp);
  const { tweetId } = useParams();
  console.log(tweetId);
  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweetDetailsStatus("idle");
        setTweetDetails(data.tweet);
      })
      .catch((error) => {
        setError(true);
        throw new Error("SOMETHING WENT WRONG, PLEASE TRY AGAIN");
      });
  }, []);

  if (error) {
    return <ErrorScreen />;
  }
  return (
    <>
      {tweetDetailsStatus === "idle" && (
        <Wrapper>
          <Title>Meow</Title>
          <Section>
            <Avatar src={tweetDetails.author.avatarSrc}></Avatar>
            <Div>
              <DisplayName to={`/${tweetDetails.author.handle}`}>
                {tweetDetails.author.displayName}
              </DisplayName>
              <Handle>@{tweetDetails.author.handle}</Handle>
              <Status>{tweetDetails.status}</Status>

              {tweetDetails.media.length && (
                <Media src={tweetDetails.media[0].url}></Media>
              )}
              <Date>{formattedTimestamp} . Critter web app</Date>
              <ActionBar />
            </Div>
          </Section>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-family: sans-serif;
  border: 1px #ddd solid;
`;
const Section = styled.section`
  display: flex;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;
const Title = styled.div`
  border-bottom: 1px #ddd solid;
  padding: 20px 0 20px 40px;
  font-size: 28px;
  font-weight: bold;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 20px;
`;

const DisplayName = styled(NavLink)`
  color: black;
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
`;
const Handle = styled.p`
  margin-top: 5px;
  color: #727272;
  font-size: 18px;
`;
const Status = styled.p`
  color: #2e2e2e;
  margin-top: -5px;
  font-size: 20px;
`;
const Media = styled.img`
  width: 900px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const Date = styled.p`
  color: #727272;
  font-size: 18px;
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
`;
export default TweetDetails;
