import styled from "styled-components";

import { COLORS } from "../constants";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { FiHome, FiUser } from "react-icons/fi";
import { MdNotificationsNone } from "react-icons/md";
// import { IoNotificationsOutline } from "react-icons/io";
import { HiOutlineBookmark } from "react-icons/hi";

const Sidebar = () => {
  return (
    <>
      <Div>
        <Ul>
          <Li>
            <LogoDiv>
              <Logo />
            </LogoDiv>
          </Li>
          <Li>
            <StyledNavLink exact activeClassName="active" to="/">
              <FiHome
                style={{ marginRight: "20px", fontSize: "23px" }}
              ></FiHome>
              Home
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink exact activeClassName="active" to="/treasurymog">
              <FiUser
                style={{ marginRight: "20px", fontSize: "23px" }}
              ></FiUser>
              Profile
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink exact activeClassName="active" to="/notifications">
              <MdNotificationsNone
                style={{ marginRight: "20px", fontSize: "23px" }}
              ></MdNotificationsNone>
              Notifications
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink exact activeClassName="active" to="/bookmarks">
              <HiOutlineBookmark
                style={{ marginRight: "20px", fontSize: "22px" }}
              ></HiOutlineBookmark>
              Bookmarks
            </StyledNavLink>
          </Li>
          <Meow>Meow</Meow>
        </Ul>
      </Div>
    </>
  );
};
const Div = styled.div`
  margin: 30px 0px 20px 40px;
  display: flex;
  min-width: 210px;
  height: 300px;
  font-family: sans-serif;
`;
const LogoDiv = styled.div`
  margin-left: -5px;
`;

const Meow = styled.button`
  border-radius: 60px;
  padding: 10px 30px;
  background-color: ${COLORS.primary};
  color: white;
  border: none;
  font-size: 17px;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px;
  list-style: none;
`;
const Li = styled.li`
  padding: 0 10px;
  margin-bottom: 10px;
  color: black;
  font-size: 19px;
`;
const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
`;
const StyledNavLink = styled(NavLink)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  &.${(props) => props.activeClassName} {
    color: ${COLORS.primary};

    /* text-decoration: underline; */
  }
  /* &:hover,
  :active {
    background-color: ${COLORS.primary};
    border-radius: 20px;
    padding: 3px;
  } */
`;
export default Sidebar;
