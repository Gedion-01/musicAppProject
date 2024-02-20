import { css } from "@emotion/react";
import { Flex, Box, Text } from "rebass";
import React from "react";

type reactProps = {
  name: string;
  albums: [string];
  totalSongs: number;
};

const ArtistsStatus: React.FC<reactProps> = ({
  name,
  albums,
  totalSongs,
}) => {

  const albumCount = albums.filter(album => album !== null).length
  const tabularStyle = css`
    margin-top: 10px;
    width: 100%;

    // background: #1f3044;
    color: #1f3044;
    &:hover {
      background: #7DA2A9;
      border-radius: 5px;
    }
    // border-radius: 10px;
    border-bottom: 1px solid #a8bcc3;
    transition: 0.4s;
  `;

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        css={tabularStyle.styles}
        p={[2]}
      >
        <Box flex={2}>
          <Text fontSize={[2, 3, 4]}>{name}</Text>
        </Box>
        <Box flex={1}>
          <Flex justifyContent={"center"}>
            <Box>
              <Text fontSize={[2, 3, 4]}>{albumCount}</Text>
            </Box>
          </Flex>
        </Box>
        <Box flex={1}>
          <Flex justifyContent={"end"}>
            <Box mr={3}>
              <Text fontSize={[2, 3, 4]}>{totalSongs}</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ArtistsStatus;
