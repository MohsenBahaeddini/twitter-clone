import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import ActionBar from "./ActionBar";
import moment from "moment";

const SmallTweet = ({ tweetInfo }) => {
  const {
    key,
    id,
    timestamp,
    status,
    media,
    handle,
    author,
    displayName,
    avatarSrc,
    bannerSrc,
    location,
    isLiked,
    isRetweeted,
    numLikes,
    numRetweets,
  } = tweetInfo;
  const formattedTimestamp = moment(timestamp).format(". MMM Do");
 
  return (
    <Wrapper>
      <StyledLinkWrapper to={`/tweet/${id}`}>
        <Avatar src={author.avatarSrc} />
        <TweetBody>
          <Div>
            <DisplayName>{author.displayName}</DisplayName>
            <StyledLink to={`/${author.handle}`}>
              <Handle>@{author.handle}</Handle>
            </StyledLink>
            <Date>{formattedTimestamp}</Date>
          </Div>
          <Status>{status}</Status>
          {media.length !== 0 && <Media src={media[0].url} />}
        </TweetBody>
      </StyledLinkWrapper>
      <ActionBar />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: block;
  border-bottom: 1px #ddd solid;
`;
const StyledLinkWrapper = styled(NavLink)`
  text-decoration: none;
  display: flex;
`;

const TweetBody = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
`;
const DisplayName = styled.p`
  color: black;
  font-weight: bold;
  font-size: 18px;
`;
const Date = styled.p`
  padding-left: 5px;
  color: #727272;
  font-size: 18px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 20px;
`;
const Div = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const Handle = styled.p`
  padding-left: 5px;
  color: #727272;
  font-size: 18px;
`;
const Status = styled.p`
  color: #2e2e2e;
  display: flex;
  word-break: break-all;
  margin-top: -5px;
  font-size: 20px;
  width: 870px;
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
export default SmallTweet;
