import {Box, Flex, Text } from "rebass";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import React, { useState } from "react";

const StyledOption = styled(SlOptionsVertical)`
  margin-right: 10px;
  font-size: 20px;
`;
const EditIcon = styled(MdOutlineEdit)`
margin-right: 10px;
font-size: 20px;
`;
const StyledRemoveIcon = styled(MdDelete)`
margin-right: 10px;
font-size: 20px;
`

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
  const [optionIsOpened, setOptionIsOpened] = useState(false);

  const myImage = styled.image`
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 60px;
  `;
  const StyledBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${optionIsOpened ? 'block' : 'none'};
  height: 100vh;
  width: 100%;
  z-index: 10;
`;

  const StyledContent = styled.div`
  font-size: 17px;
  position: absolute;
  min-width: 100px;
  background-color: #d0e3f0;
  box-shadow: 2px 2px 5px rgba(0, 0, 255, 0.1);
  border-radius: 10px;
  margin-right: 5px;
  display: ${optionIsOpened ? 'block' : 'none'};
  z-index: 30;
  `
  const StyledButton = styled.div`
  padding: 5px 2px;
  border: none;
  
  
  `
  const spotifyStyle = css`
  
    color: #1F3044;
    padding: 4px 4px;
    border-radius: 8px;
    
    background-color: ${optionIsOpened ? '#a8bcc3' : ''};
    max-width: 800px;
    &: hover {
      background-color: #a8bcc3;
    }
    transition: all .5s ease;
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
  const StyledOptionContainer = css`
  cursor: pointer;
  `
  const StyledlementsMenuebarContent = css`
  &:hover {
    color: #1BA098;
  }
  transition: .4s;
  `
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
  const handleOptionClick = () => {
    setOptionIsOpened(prev => !prev);
  };

  return (
    <>
    <StyledBackGround onClick={handleOptionClick}></StyledBackGround>
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      css={spotifyStyle.styles}
    >
      <Flex flexDirection={"row"} alignItems={"center"} flex={1.5} css={playTitle.styles}>
      <Box ml={2}>
        {true ? <FaPlay /> : <FaPause />}
      </Box>
      <Box>
        <img
          style={{ width: "45px", height: "45px", borderRadius: "5px" }}
          src={
            "https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain"
          }
        />
      </Box>
      <Flex flexDirection={"column"} justifyContent={"space-between"} css={titleStyle.styles}>
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
      <Box css={[boxStyle.styles, hiddenOnSmallScreen.styles]} flex={1} mr={2}>
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
      <Box css={[boxStyle.styles, hiddenOnSmallScreen.styles]} flex={1}>
        <Text fontSize={14}>{formatDate(date)}</Text>
      </Box>
      <Box css={StyledOptionContainer.styles}>
        <StyledOption onClick={handleOptionClick}/>
        {optionIsOpened && (
          <StyledContent>
            <Flex flexDirection={"row"} alignItems={"center"} p={2} css={StyledlementsMenuebarContent.styles}>
              <Box>
                <EditIcon />
              </Box>
              <Box>
                <StyledButton>Edit</StyledButton>
              </Box>
            </Flex>
            <Flex flexDirection={"row"} alignItems={"center"} p={2} css={StyledlementsMenuebarContent.styles}>
              <Box>
                <StyledRemoveIcon />
              </Box>
              <Box>
                <StyledButton>Remove</StyledButton>
              </Box>
            </Flex>
          </StyledContent>
        )}
      </Box>
    </Flex>
    </>
  );
};

export default Music;
