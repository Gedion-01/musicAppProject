import { css } from "@emotion/react";
import styled from "@emotion/styled";
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
  `;
    const tabularStyle = css`
    margin-top: 10px;
    width: 100%;
    padding: 12px 10px;
    color: #e1f2f7;
    background: #1f3044;
    border-radius: 10px;
  `;
    const titleStyle = css`
    margin-top: 15px;
    width: 100%;
  `;
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
