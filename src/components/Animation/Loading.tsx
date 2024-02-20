import styled from '@emotion/styled';
import { useEffect } from 'react';

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  height: 100vh;
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #01345B;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite; /* Using spin animation directly */
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;


const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LoaderContainer>
      <Loader />
      <LoadingText>Loading...</LoadingText>
    </LoaderContainer>
  );
};

export default Loading;
