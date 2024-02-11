import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect } from "react";
import { useParams } from "react-router";
import Music from "../components/Music";
import TracksList from "../components/TracksList";

interface Song {
  album: string;
  artist: string;
  coverImageUrl: string;
  createdAt: string;
  genre: string;
  title: string;
  updatedAt: string;
  _id: string;
}

function FilteredSongsPage() {
  const { genre } = useParams();
  const data = useSelector((state: RootState) => state.songs.songsByGenre);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "songsByGenre/fetchSongs", payload: { genre: genre } });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);

  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={6} fontWeight="bold" mb={2}>
          {genre}
        </Text>
      </Box>
      <Box>
        {
          <TracksList data={data} />
        }
      </Box>
    </Flex>
  );
}

export default FilteredSongsPage;
