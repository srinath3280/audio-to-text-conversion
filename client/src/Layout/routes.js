import { Routes, Route } from "react-router-dom";

import HomePage from "../Pages/Home/HomePage";
import AudioConvert from "../Pages/AudioConvert/AudioConvert";
import NotFound from "../Components/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/audio-convert" element={<AudioConvert />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;