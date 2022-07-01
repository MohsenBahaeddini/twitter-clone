import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import ActionBar from "./ActionBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrLocation } from "react-icons/gr";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { COLORS } from "../constants";
import { keyframes } from "styled-components";
import ErrorScreen from "./ErrorScreen";
import moment from "moment";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [profileStatus, setProfileStatus] = useState("loading");
  const [feed, setFeed] = useState({});
  const [feedStatus, setFeedStatus] = useState("loading");
  const { currentUser } = useContext(CurrentUserContext);
  const { profileId } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfileStatus("idle");
        setProfile(data);
      });

    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setFeedStatus("idle");
        setFeed(data);
      })
      .catch((test) => {
        setError(true);
        throw new Error("SOMETHING WENT WRONG, PLEASE TRY AGAIN");
      });
  }, [profileId]);

  if (error) {
    return <ErrorScreen />;
  }
  if (feedStatus === "loading") {
    return <LoadingSpinner />;
  }

  const fromattedJoined = moment(profile.profile.joined).format("MMMM YYYY");
  return (
    <>
      <Wrapper>
        {profileStatus === "idle" && (
          <Header>
            <Banner src={profile.profile.bannerSrc} />
            <Avatar src={profile.profile.avatarSrc}></Avatar>
            <ButtonWrapper>
              <Button>Following</Button>
            </ButtonWrapper>
            <Section>
              <ProfileName>{profile.profile.displayName}</ProfileName>
              <ProfileHandle>
                @{profile.profile.handle}
                {profile.profile.isFollowingYou && (
                  <FollowsYou>Follows you</FollowsYou>
                )}
              </ProfileHandle>
              {console.log(profile)}

              <Bio>{profile.profile.bio}</Bio>
              <HiOutlineLocationMarker style={{ color: " #727272" }} />
              <Location>{profile.profile.location}</Location>
              <HiOutlineCalendar
                style={{ color: " #727272" }}
              ></HiOutlineCalendar>
              <Joined>Joined {fromattedJoined}</Joined>
              <Following>
                <span style={{ color: " black", marginRight: "3px" }}>
                  {profile.profile.numFollowing}
                </span>
                Following
                <Followers>
                  <span style={{ color: " black", marginRight: "3px" }}>
                    {profile.profile.numFollowers}
                  </span>
                  Followers
                </Followers>
              </Following>
              <Action>
                <Tweets>Tweets</Tweets>
                <span>Media</span> <span>Likes</span>
              </Action>
            </Section>
          </Header>
        )}
        {feedStatus === "idle" &&
          feed.tweetIds.map((tweetid) => {
            const fromattedTimestamp = moment(
              feed.tweetsById[tweetid].timestamp
            ).format(". MMM Do");

            return (
              <>
                <Section2>
                  <ProfileFeed to={`/tweet/${tweetid}`}>
                    <FeedAvatar
                      src={feed.tweetsById[tweetid].author.avatarSrc}
                    />
                    <FeedWrapper>
                      <Div>
                        <DisplayName>
                          {feed.tweetsById[tweetid].author.displayName}
                        </DisplayName>
                        <Handle>
                          <Link
                            to={`/${feed.tweetsById[tweetid].author.handle}`}
                            style={{ textDecoration: "none", color: "#727272" }}
                          >
                            @{feed.tweetsById[tweetid].author.handle}
                          </Link>
                        </Handle>{" "}
                        . <Date>{fromattedTimestamp}</Date>
                      </Div>
                      <Status key="tweetid">
                        {feed.tweetsById[tweetid].status}
                      </Status>
                      {feed.tweetsById[tweetid].media.length !== 0 && (
                        <Media src={feed.tweetsById[tweetid].media[0].url} />
                      )}
                    </FeedWrapper>
                  </ProfileFeed>
                  <ActionBar />
                </Section2>
              </>
            );
          })}
      </Wrapper>
    </>
  );
};

// Main Wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  border: 1px solid #aaa;
  width: 1000px;
`;

const Header = styled.div`
  margin-top: -1px;
`;
const Banner = styled.img`
  width: 100%;
`;
const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px white solid;
  margin: -120px 0 0 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 20px;

  margin-top: -60px;
`;
const Button = styled.button`
  border: none;
  padding: 10px 25px;
  border-radius: 30px;
  color: white;
  background-color: ${COLORS.primary};
  font-size: 18px;
`;
const Section = styled.section`
  margin: 30px;
`;
const ProfileName = styled.h1`
  font-weight: bold;
  font-size: 28px;
`;
const ProfileHandle = styled.h2`
  color: #727272;
  font-size: 15px;
  margin-top: -20px;
`;
const FollowsYou = styled.span`
  margin-left: 10px;
  padding: 3px;
  border-radius: 3px;
  background-color: #ddd;
`;

const Bio = styled.p`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;
const Location = styled.span`
  margin-right: 20px;
  margin-left: 5px;
  color: #727272;
  font-weight: bold;
`;
const Joined = styled.span`
  color: #727272;
  font-size: 15px;
  font-weight: bold;
  margin-right: 20px;
  margin-left: 5px;
`;
const Following = styled.p`
  color: #727272;
  font-size: 17px;
  font-weight: bold;
  margin: 16px 0 10px 0;
`;
const Followers = styled.span`
  color: #727272;
  font-size: 17px;
  font-weight: bold;
  margin-left: 30px;
`;
const Action = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  text-align: center;
  margin-top: 30px;
  margin-bottom: -30px;
  justify-content: space-between;
  color: #727272;
  font-weight: bold;
  font-size: 19px;
`;
const Tweets = styled.span`
  color: hsl(258deg, 100%, 50%);
  display: block;
  border-bottom: 2px solid hsl(258deg, 100%, 50%);
  padding-bottom: 22px;
  color: ${COLORS.primary};
`;

const Section2 = styled.div`
  border-top: 1px solid #aaa;
`;
const ProfileFeed = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: black;
`;
const FeedAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 20px 10px 0 20px;
`;
const Media = styled.img`
  width: 900px;
  height: 500px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const FeedWrapper = styled.div`
  margin: 10px 0 0 5px;
`;
const Div = styled.div`
  display: flex;
`;
const DisplayName = styled.p`
  color: black;
  font-weight: bold;
  font-size: 18px;
`;
const Handle = styled.p`
  padding-left: 5px;
  color: #727272;
  font-size: 18px;
`;
const Date = styled.p`
  padding-left: 5px;
  color: #727272;
  font-size: 18px;
`;
const Status = styled.p`
  color: #2e2e2e;
  word-break: break-all;
  margin-top: -10px;
  font-size: 20px;
  width: 870px;
`;
export default Profile;
