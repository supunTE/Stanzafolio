import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { InfoPage } from "./pages/Info.page";
import { RoomPage } from "./pages/Room.page";

export function Router() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RoomPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </AnimatePresence>
  );
}
