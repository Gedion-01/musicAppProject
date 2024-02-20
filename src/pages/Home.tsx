import { useEffect } from "react";
import { Flex } from "rebass";
import { css } from "@emotion/react";
//
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import TracksList from "../components/TracksList";
import Loading from "../components/Animation/Loading";

function Home() {
  const data = useSelector((state: RootState) => state.songs.songs);

  const isLoading = useSelector(
    (state: RootState) => state.songs.getSongsLoading
  );

  const dispatch = useDispatch();

  const HomeStyle = css`
    width: 100%;
  `;

  useEffect(() => {
    dispatch({ type: "songs/fetchSongs" });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Flex flexDirection={"column"} css={HomeStyle.styles}>
        
        {isLoading ? <Loading /> : <TracksList data={data} />}
      </Flex>
    </>
  );
}

export default Home;
