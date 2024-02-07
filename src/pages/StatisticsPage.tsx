import { css } from "@emotion/react";

import { Flex, Box, Text } from "rebass";
import StatusCard from "../components/StatusCard";

import GenreStatus from "../components/GenreStatus";
import ArtistsAlbumStatus from "../components/ArtistsAlbumStatus";
import AlbumStatus from "../components/AlbumStatus";
import ArtistsSongStatus from "../components/ArtistsSongsStatus";

export default function StatisticsPage() {
  const overViewContainerStyle = css`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  `.toString();

  return (
    <>
      <Flex flexDirection={"column"}>
        <Box>
          <Text fontSize={5} fontWeight="bold" mb={2}>
            Overview
          </Text>
        </Box>
        {/* over view cards */}
        <Flex css={overViewContainerStyle}>
          <StatusCard />
          <StatusCard />
          <StatusCard />
          <StatusCard />
        </Flex>
        <GenreStatus />
        <ArtistsAlbumStatus />
        <ArtistsSongStatus />
        <AlbumStatus />
      </Flex>
    </>
  );
}
