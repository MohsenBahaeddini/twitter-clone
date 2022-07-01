import { keyframes } from "styled-components";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <>
      <CenteredLoading>
        <Loading class="lds-dual-ring"></Loading>
      </CenteredLoading>
    </>
  );
};

const CenteredLoading = styled.div`
  display: flex;
  margin: auto;
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
export default LoadingSpinner;
