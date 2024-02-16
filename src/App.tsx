import { Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage";
import StatisticsPage from "./pages/StatisticsPage";
import FilteredSongsPage from "./pages/FilteredSongsPage";
import AddSongPage from "./pages/AddSongPage";
import EditSongPage from "./pages/EditSongPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/genre/:genre" element={<FilteredSongsPage />} />
          <Route path="/Statistics" element={<StatisticsPage />} />
          <Route path="/addSong" element={<AddSongPage />} />
          <Route path="/editSong/:id" element={<EditSongPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
