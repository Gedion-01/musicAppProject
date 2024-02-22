import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Music from "./Music";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  songDataUrl: string
}
interface data {
  data: Song[];
}

const TracksList: React.FC<data> = ({ data }) => {
  const isPlaying = useSelector(
    (state: RootState) => state.playerData.isPlaying
  );
  const search = useSelector(
    (state: RootState) => state.songs.search
  );
  
  const currentData = useSelector(
    (state: RootState) => state.playerData.currentData
  );

  const filteredArray = data.filter((song) => {
    const titleMatch = song.title.toLowerCase().includes(search.toLowerCase());
    const artistMatch = song.artist.toLowerCase().includes(search.toLowerCase());
    return search === '' ? song : titleMatch || artistMatch;
  });
  
  return (
    <div>
      {
        
        data.filter((song) => {
          const titleMatch = song.title.toLowerCase().includes(search.toLowerCase())
          const artistMatch = song.artist.toLowerCase().includes(search.toLowerCase())
          return search === '' ? song : titleMatch || artistMatch
          
        }).map((song, index) => (
          <Music
            key={song._id}
            _id={song._id}
            title={song.title}
            artist={song.artist}
            album={song.album}
            genre={song.genre}
            coverImageUrl={song.coverImageUrl}
            createdAt={song.updatedAt}
            updatedAt={song.updatedAt}
            __v={song.__v}
            songDataUrl={song.songDataUrl}
            playerQueue={filteredArray}
            index={index}
            isCurrent={song._id === currentData._id}
            isPlaying={isPlaying}
          />
        ))
        // <TracksList data={data} />
      }
    </div>
  );
};

export default TracksList;
