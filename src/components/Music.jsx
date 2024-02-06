import { Card, Box, Flex, Text } from "rebass";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

import { css } from "@emotion/core";
import styled from "@emotion/styled";

const Music = () => {
    const spotifyStyle = css`
    background-color: #121212;
    color: #ffffff;
    padding: 10px;
    border-radius: 8px;
    margin: 5px;

    max-width: 800px;
  `;
  const playTitle = css`
    color: #ffffff;
    border-radius: 8px;
    margin: 5px;
    margin-left: 8px;
    width: 130px;
  `;

  const boxStyle = css`
    margin-right: 10px; /* Adjust the margin as needed */
  `;

  const hiddenOnSmallScreen = css`
    @media (max-width: 600px) {
      display: none;
    }
  `;
  
    return(
        <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        css={spotifyStyle}
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          css={playTitle}
        >
          <Box>
            {
              true ? <FaPlay/> : <FaPause />
            }
          </Box>
          <Box>
            <Text fontSize={16} fontWeight="bold">
              Title
            </Text>
            <Text fontSize={14}>Artist Name</Text>
          </Box>
        </Flex>

        <Box css={[boxStyle, hiddenOnSmallScreen]}>
          <Text fontSize={14}>Album Name</Text>
        </Box>
        <Box css={[boxStyle, hiddenOnSmallScreen]}>
          <Text fontSize={14}>Upload Date</Text>
        </Box>
        <Box>
          <SlOptionsVertical />
        </Box>
      </Flex>
    )
}

export default Music