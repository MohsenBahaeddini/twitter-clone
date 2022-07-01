import styled, { keyframes } from "styled-components";

const PoppingCircle = ({ size, color }) => {
  return (
    <Wrapper
      style={{
        width: size,
        height: size,
        background: color,
      }}
    ></Wrapper>
  );
};
const fadeCircle = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const scaleCircle = keyframes`
from {
transform:scale(0);
}
to {
transform:scale(1);
}
`;

const Wrapper = styled.div`
  @media (screen) {
    animation: ${fadeCircle} 500ms ease-in forwards,
      ${scaleCircle} 300ms ease-in forwards;
  }
`;
export default PoppingCircle;
