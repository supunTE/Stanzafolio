import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const RoomPage = lazy(() => import("./pages/Room.page"));
const InfoPage = lazy(() => import("./pages/Info.page"));

export function Router() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RoomPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
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

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}
