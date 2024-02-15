import { useEffect } from "react";
import { Flex, Box, Text } from "rebass";
import { css } from "@emotion/react";
//
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import TracksList from "../components/TracksList";
import { setAudioProgress, setImageProgress } from "../state/songs/songsSlice";

function Home() {
  const data = useSelector((state: RootState) => state.songs.songs);

  const isLoading = useSelector(
    (state: RootState) => state.songs.getSongsLoading
  );

  const dispatch = useDispatch();
  // reset upload progress bar
  // useEffect(() => {
  //   dispatch(setAudioProgress(0));
  //   dispatch(setImageProgress(0));
  // }, []);

  const HomeStyle = css`
    width: 100%;
  `;

  useEffect(() => {
    dispatch({ type: "songs/fetchSongs" });
  }, []);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  console.log(data);

  return (
    <>
      <Flex flexDirection={"column"} css={HomeStyle.styles}>
        <Box>
          <Text fontSize={5} fontWeight="bold">
            All Songs
          </Text>
        </Box>
        {isLoading ? "Loading" : <TracksList data={data} />}
      </Flex>
    </>
  );
}

export default Home;
