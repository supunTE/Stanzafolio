import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const RoomPage = lazy(() => import("./pages/Room.page"));
const InfoPage = lazy(() => import("./pages/Info.page"));

export function Router() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Suspense fallback={<Loading />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RoomPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg text-black">
        <p>Loading...</p>
      </div>
    </div>
  );
}
