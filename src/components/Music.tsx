import { Card, Box, Flex, Text } from "rebass";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { height } from "styled-system";
import React from "react";

type myComponentProp = {
  album: string;
  artist: string;
  coverImageUrl?: string;
  date: string;
  title: string;
  _id?: string;
};
const Music: React.FC<myComponentProp> = ({
  album,
  artist,
  coverImageUrl,
  date,
  title,
  _id,
}) => {
  const myImage = styled.image`
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 60px;
  `;
  const spotifyStyle = css`
  background-color: #a8bcc3;
    color: #1F3044;
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
    height: 40px;
  `;
  function formatDate(date: string): string {
    const dateObject: Date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate: string = dateObject.toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
  }

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      css={spotifyStyle}
    >
      <Flex flexDirection={"row"} alignItems={"center"} flex={1.5} css={playTitle}>
      <Box ml={2}>
        {true ? <FaPlay /> : <FaPause />}
      </Box>
      <Box>
        <img
          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          src={
            "https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain"
          }
        />
      </Box>
      <Flex flexDirection={"column"} justifyContent={"space-between"} css={titleStyle}>
      <Box>
        <Text fontSize={16} fontWeight="bold">
          {title}
        </Text>
      </Box>
      <Box>
        <Text fontSize={14}>{artist}</Text>
      </Box>
      </Flex>
      </Flex>
      <Box css={[boxStyle, hiddenOnSmallScreen]} flex={1}>
        <Text
          fontSize={14}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {album}
        </Text>
      </Box>
      <Box css={[boxStyle, hiddenOnSmallScreen]} flex={1}>
        <Text fontSize={14}>{formatDate(date)}</Text>
      </Box>
      <Box>
        <SlOptionsVertical />
      </Box>
    </Flex>
  );
};

export default Music;
