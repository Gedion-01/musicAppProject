import { Card, Box, Flex, Text } from "rebass";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { height } from "styled-system";
import React from "react";

type myComponentProp = {
  album : string;
  artist : string;
  coverImageUrl? : string;
  date : string;
  title : string;
  _id?: string
}
const Music : React.FC<myComponentProp> = ({album, artist, coverImageUrl, date, title, _id}) => {
  const myImage = styled.image`
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 60px;
  `;
  const spotifyStyle = css`
    background-color: #1F3044;
    color: #ffffff;
    padding: 5px 5px;
    border-radius: 8px;
    margin: 5px;

    max-width: 800px;
  `;
  const playTitle = css`
    gap: 20px;
  `;

  const boxStyle = css`
    margin-right: 10px; /* Adjust the margin as needed */
  `;

  const hiddenOnSmallScreen = css`
    @media (max-width: 600px) {
      display: none;
    }
  `;
  const titleStyle = css`
    height: 100%;
    gap: 12px;
  `;

  return (
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
        <Box ml={2}>{true ? <FaPlay /> : <FaPause />}</Box>
        <Box>
          <img
            style={{ width: "50px", height: "50px", borderRadius: "5px" }}
            src={
              "https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain"
            }
          />
        </Box>
        <Box>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            css={titleStyle}
          >
            <Box>
              <Text fontSize={16} fontWeight="bold">
                {title}
              </Text>
            </Box>
            <Box>
              <Text fontSize={14}>{artist}</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Box css={[boxStyle, hiddenOnSmallScreen]}>
        <Text fontSize={14}>{album}</Text>
      </Box>
      <Box css={[boxStyle, hiddenOnSmallScreen]}>
        <Text fontSize={14}>{date}</Text>
      </Box>
      <Box>
        <SlOptionsVertical />
      </Box>
    </Flex>
  );
};

export default Music;
