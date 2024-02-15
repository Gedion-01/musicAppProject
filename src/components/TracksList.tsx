import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import Music from "./Music";
import SuccessToast from "./Toasts/SuccessToast";

interface Song {
  album: string;
  artist: string;
  coverImageUrl: string;
  createdAt: string;
  genre: string;
  title: string;
  updatedAt: string;
  _id: string;
  songDataUrl: string
}
interface data {
  data: Song[];
}

const TracksList: React.FC<data> = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  const dispatch = useDispatch()

  const isPlaying = useSelector(
    (state: RootState) => state.playerData.isPlaying
  );
  const currentData: any = useSelector(
    (state: RootState) => state.playerData.currentData
  );
  
  
  //console.log(data[0]._id, currentData._id)
  return (
    <div>
      {
        data.map((song: Song, index) => (
          <Music
            key={song._id} // Remember to provide a unique key prop when rendering a list of components
            artist={song.artist}
            title={song.title}
            album={song.album}
            date={song.updatedAt}
            _id={song._id}
            playListData={data as any}
            index={index}
            isCurrent={song._id === currentData._id}
            isPlaying={isPlaying}
            songDataUrl={song.songDataUrl}
          />
        ))
        // <TracksList data={data} />
      }
    </div>
  );
};

export default TracksList;
