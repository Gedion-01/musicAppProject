import { css } from "@emotion/react";

import { Flex } from "rebass";
import StatusCard from "../components/StatusCard";

import GenreStatus from "../components/GenreStatus";
import AlbumStatus from "../components/AlbumStatus";
import ArtistsStatus from "../components/ArtistsStatus";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import styled from "@emotion/styled";
import AllGenresTitle from "../components/AllGenresTitle";
import SongsAndAlbumsperArtistTitle from "../components/SongsAndAlbumsperArtistTitle";
import AlbumStatusTitle from "../components/AlbumStatusTitle";
import Loading from "../components/Animation/Loading";

const StyledDiv = styled.div`
max-width: 900px;
`

const Datacontainer = styled.div``;
const WrapperStyle = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 25px;
  background-color: #F7F7F7;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #a8bcc3;
`;

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

  const genres = useSelector(
    (state: RootState) => state.songsDataStatistics.genreCounts
  );
  const songsAndAlbumsperArtist = useSelector(
    (state: RootState) => state.songsDataStatistics.songsAndAlbumsperArtist
  );
  const albumCountsAndSongs = useSelector(
    (state: RootState) => state.songsDataStatistics.albumCountsAndSongs
  );
  const isDataLoading = useSelector(
    (state: RootState) => state.songsDataStatistics.songDataStatisticsLoading
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const overViewContainerStyle = css`
    gap: 10px;
    flex-wrap: wrap;
  `;

  useEffect(() => {
    dispatch({ type: "songs/fetchSongsStatistics" });
    dispatch({ type: "songs/fetchSongsStatisticsData" });
  }, []);

  return (

    
    <StyledDiv>
  
    {
      isDataLoading ? <Loading /> :
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        
        <Flex css={overViewContainerStyle.styles} flexDirection={"row"} mb={4}>

          <StatusCard title="Total Songs" data={totalNumberOfSongs} />

          <StatusCard title="Total Artists" data={totalNumberOfArtists} />

          <StatusCard title="Total Albums" data={totalNumberOfAlbums} />

          <StatusCard title="Total Genres" data={totalNumberOfGenres} />
        </Flex>
        <WrapperStyle>
          <AllGenresTitle />
          <Datacontainer>
            {isDataLoading
              ? "loading"
              : genres.map((genre, index) => {
                  return (
                    <GenreStatus
                      key={index}
                      name={genre._id}
                      total={genre.count}
                    />
                  );
                })}
          </Datacontainer>
        </WrapperStyle>
        <WrapperStyle>
          <SongsAndAlbumsperArtistTitle />
          <Datacontainer>
            {isDataLoading
              ? "loading"
              : songsAndAlbumsperArtist.map((data, index) => {
                  return (
                    <ArtistsStatus
                      key={index}
                      name={data.artist}
                      albums={data.albums}
                      totalSongs={data.totalSongs}
                    />
                  );
                })}
          </Datacontainer>
        </WrapperStyle>

        <WrapperStyle>
          <AlbumStatusTitle />
          <Datacontainer>
            {albumCountsAndSongs.map((data, index) => {
              return (
                <AlbumStatus key={index} name={data.album} total={data.count} />
              );
            })}
          </Datacontainer>
        </WrapperStyle>
      </Flex>
      
    }
    </StyledDiv>
    
  );
}
