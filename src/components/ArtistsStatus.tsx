import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import StatusCard from "./StatusCard";
import React from "react";

type reactProps = {
  name: string;
  totalAlbums: number;
  totalSongs: number;
}


const ArtistsStatus: React.FC<reactProps> = ({name, totalAlbums, totalSongs}) => {

  const tabularStyle = css`
    margin-top: 10px;
    width: 100%;
    padding: 12px 10px;
    // background: #1f3044;
    color: #1F3044;
    &:hover {
      background: #a8bcc3;
      border-radius: 10px;
    }
    // border-radius: 10px;
    border-bottom: 1px solid #a8bcc3;
  `;
  
  return (
    <Flex flexDirection="column">
      
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        css={tabularStyle.styles}
      >
        <Box flex={2}>
          <Text fontSize={3}>
            {name}
          </Text>
        </Box>
        <Box flex={1}>
        <Flex justifyContent={"center"}>
            <Box>
              <Text fontSize={3}>
                {totalAlbums}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box flex={1}>
        <Flex justifyContent={"end"}>
            <Box mr={3}>
              <Text fontSize={3}>
                {totalSongs}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ArtistsStatus;
