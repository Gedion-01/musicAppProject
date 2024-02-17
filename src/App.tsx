import { Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
// import Home from "./pages/Home";
// import GenrePage from "./pages/GenrePage";
// import StatisticsPage from "./pages/StatisticsPage";
// import FilteredSongsPage from "./pages/FilteredSongsPage";
// import AddSongPage from "./pages/AddSongPage";
// import EditSongPage from "./pages/EditSongPage";
import { Suspense, lazy } from "react";

// Lazy loading dynamic components
const Home = lazy(() => import('./pages/Home'));
const GenrePage = lazy(() => import('./pages/GenrePage'));
const FilteredSongsPage = lazy(() => import('./pages/FilteredSongsPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const AddSongPage = lazy(() => import('./pages/AddSongPage'));
const EditSongPage = lazy(() => import('./pages/EditSongPage'));



function App() {
  return (
    <>
      <Main>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/genre/:genre" element={<FilteredSongsPage />} />
          <Route path="/Statistics" element={<StatisticsPage />} />
          <Route path="/addSong" element={<AddSongPage />} />
          <Route path="/editSong/:id" element={<EditSongPage />} />
      </Routes>
      </Suspense>
      </Main>
    </>
  );
}

export default App;
