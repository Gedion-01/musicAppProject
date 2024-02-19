import React from "react";
import { css } from "@emotion/react";
import { Flex, Box, Text } from "rebass";
import styled from "@emotion/styled";

type GenreProps = {
  name: string;
  imgUrl: string;
};

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  @media screen and (max-width: 350px) { /* Adjust the breakpoint as needed */
    width: 100%; /* Maximum width for two cards per row with gap */
  }
`;

const Genre: React.FC<GenreProps> = ({ name, imgUrl }) => {
  const genreStyles = css`
    flex:  1 auto; 
    width: 150px;
    cursor: pointer;
    text-decoration: none;
    transition: 0.4s;
    margin-bottom: 20px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
   
  `;

  return (
    <Flex flexDirection="column" css={genreStyles.styles}>
      <StyledImage src={imgUrl} alt={name} />
      <Box p={3}>
        <Text fontSize={3} fontWeight="bold" textAlign="center">
          {name}
        </Text>
      </Box>
    </Flex>
  );
};

export default Genre;
