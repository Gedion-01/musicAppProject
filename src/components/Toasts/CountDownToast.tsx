import React, { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Flex, Text } from "rebass";

import { FaRegCircleCheck } from "react-icons/fa6";
import { setShowSuccessToast } from "../../state/songs/songsSlice";
import { useDispatch } from "react-redux";

type myComponentProp = {
  isToastVisible: boolean;
  light: boolean;
  message: string;
  duration: number;
};

const SuccessToast: React.FC<myComponentProp> = ({
  isToastVisible,
  message,
  light,
  duration,
}) => {
    const [countdown, setCountdown] = useState(duration / 1000); // Convert duration from milliseconds to seconds

    useEffect(() => {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Update countdown every second
  
      // Clear timer and call onClose when countdown reaches 0
      if (countdown === 0) {
        clearTimeout(timer);
      }
  
      return () => clearTimeout(timer);
    }, [countdown]);

  // Define keyframes for slide animation
  const slideIn = keyframes`
from {
  transform: translateX(100%);
}
to {
  transform: translateX(0);
}
`;

  const slideOut = keyframes`
from {
  transform: translateX(0);
}
to {
  transform: translateX(100%);
  opacity: 0; /* Fade out the toast during slide out */
}
`;

  // Define a custom styled component with the isVisible prop
  const ToastContainer = styled.div<{ isVisible: boolean }>`
    position: fixed;
    bottom: 20px;
    right: 20px; /* Keep toast on-screen */
    z-index: 20;
    background: ${light ? "#E1F2F7" : "#1f3044"};
    color: ${light ? "#1f3044" : "##fff"};
    padding: 10px 20px;
    border-radius: 5px;
    animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.5s
      ease-in-out;
    opacity: ${({ isVisible }) =>
      isVisible ? "1" : "0"}; /* Hide the toast when it's not visible */
    pointer-events: ${({ isVisible }) =>
      isVisible
        ? "auto"
        : "none"}; /* Enable pointer events when toast is visible */
  `;

  const StyledCheckMark = styled(FaRegCircleCheck)`
    font-size: 25px;
    color: green;
  `;
  return (
    <ToastContainer isVisible={isToastVisible}>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <StyledCheckMark />

        <Text fontSize={3}>{message}</Text>
      </Flex>
    </ToastContainer>
  );
};

export default SuccessToast;
