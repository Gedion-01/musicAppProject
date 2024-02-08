import { css, SerializedStyles } from "@emotion/react";

import { Flex, Box, Text } from "rebass";
import StatusCard from "../components/StatusCard";

import GenreStatus from "../components/GenreStatus";
import AlbumStatus from "../components/AlbumStatus";
import ArtistsStatus from "../components/ArtistsStatus";
import { useEffect } from "react";

import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function StatisticsPage() {
  const totalNumberOfSongs = useSelector(
    (state: RootState) => state.songsStatistics.TotalNumberOfSongs
  );
  const totalNumberOfArtists = useSelector(
    (state: RootState) => state.songsStatistics.TotalNumberOfArtists
  );
  const totalNumberOfAlbums = useSelector(
    (state: RootState) => state.songsStatistics.TotalNumberOfAlbums
  );
  const totalNumberOfGenres = useSelector(
    (state: RootState) => state.songsStatistics.TotalNumberOfGenres
  );
  const isOverViewLoading = useSelector(
    (state: RootState) => state.songsStatistics.isLoading
  );

  const genres = useSelector(
    (state: RootState) => state.songsDataStatistics.genreCounts
  );
  const isDataLoading = useSelector((state: RootState) => state.songsDataStatistics.isLoading)

  const dispatch = useDispatch();

  const overViewContainerStyle = css`
    gap: 10px;
    flex-wrap: wrap;
  `;
  const titleStyle = css`
    margin-top: 15px;
    width: 100%;
  `;

  useEffect(() => {
    dispatch({ type: "songs/fetchSongsStatistics" });
    dispatch({ type: "songs/fetchSongsStatisticsData" });
  }, []);
  console.log(totalNumberOfSongs, genres);

  return (
    <>
      <Flex flexDirection={"column"}>
        <Box>
          <Text fontSize={5} fontWeight="bold" mb={2}>
            Overview
          </Text>
        </Box>
        {/* over view cards */}
        <Flex css={overViewContainerStyle.styles} flexDirection={"row"}>
          {/* Total songs */}
          <StatusCard title="Total Songs" data={totalNumberOfSongs} />
          {/* Total artists */}
          <StatusCard title="Total Artists" data={totalNumberOfArtists} />
          {/* Total albums */}
          <StatusCard title="Total Albums" data={totalNumberOfAlbums} />
          {/* Total genres */}
          <StatusCard title="Total Genres" data={totalNumberOfGenres} />
        </Flex>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          css={titleStyle.styles}
        >
          <Box>
            <Text fontSize={3} fontWeight="bold">
              Genres
            </Text>
          </Box>
          <Box>
            <Text fontSize={3} fontWeight="bold">
              Total Songs
            </Text>
          </Box>
        </Flex>
        <div>
        {
          isDataLoading ? "loading" :
          genres.map((genre: any) => {
            return <GenreStatus name={genre._id} total={genre.count} />
          })
        }
        </div>
        <ArtistsStatus />
        <AlbumStatus />
      </Flex>
    </>
  );
}
