import { Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import { Suspense, lazy } from "react";
import Loading from "./components/Animation/Loading";

import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import("./pages/Home"));
const GenrePage = lazy(() => import("./pages/GenrePage"));
const FilteredSongsPage = lazy(() => import("./pages/FilteredSongsPage"));
const StatisticsPage = lazy(() => import("./pages/StatisticsPage"));
const AddSongPage = lazy(() => import("./pages/AddSongPage"));
const EditSongPage = lazy(() => import("./pages/EditSongPage"));

function App() {
  return (
    <>
      <Main>
        <Suspense fallback={<Loading />}>
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
    <Analytics />
    </>
  );
}

export default App;
