import { Route, Routes, useLocation } from "react-router-dom";
import { RoomPage } from "./pages/Room.page";
import { InfoPage } from "./pages/Info.page";
import { AnimatePresence } from "framer-motion";

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
