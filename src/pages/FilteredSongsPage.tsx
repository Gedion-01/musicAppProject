import { Flex, Box, Text } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect } from "react";
import { useParams } from "react-router";
import TracksList from "../components/TracksList";
import Loading from "../components/Animation/Loading";

function FilteredSongsPage() {
  const { genre } = useParams();
  const songsByGenreLoading = useSelector(
    (state: RootState) => state.songs.songsByGenreLoading
  );
  const data = useSelector((state: RootState) => state.songs.songsByGenre);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "songsByGenre/fetchSongs", payload: { genre: genre } });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={5} fontWeight="bold" mb={2}>
          {genre}
        </Text>
      </Box>
      <Box>
        {songsByGenreLoading ? <Loading /> : <TracksList data={data} />}
      </Box>
    </Flex>
  );
}

export default FilteredSongsPage;
