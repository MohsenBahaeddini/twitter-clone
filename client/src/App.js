import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notifications from "./components/Notifications";
import HomeFeed from "./components/HomeFeed";
import Logo from "./components/Logo";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { CurrentUserContext } from "./components/CurrentUserContext";
import styled from "styled-components";
import ErrorScreen from "./components/ErrorScreen";
import { keyframes } from "styled-components";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { status, setStatus } = useContext(CurrentUserContext);

  return (
    <Router>
      <Wrapper>
        <Sidebar />

        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route exact path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin-top: -8px;
  margin-right: 80px;
`;

export default App;
