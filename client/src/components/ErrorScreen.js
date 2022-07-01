import { GiFireBomb } from "react-icons/gi";
import styled from "styled-components";
const ErrorScreen = ({ error, setError }) => {
  return (
    <Wrapper>
      <Div>
        <GiFireBomb style={{ fontSize: "100px" }}></GiFireBomb>
        <h1>An unknown error has occured.</h1>
        <P>Please try refreshing the page.</P>
      </Div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin: auto;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`;

const P = styled.p`
  font-size: 20px;
`;
export default ErrorScreen;
