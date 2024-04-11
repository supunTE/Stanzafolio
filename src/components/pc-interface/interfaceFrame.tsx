import { motion } from "framer-motion";

import { Interface } from "./interface";
import { InterfaceLoading } from "./interface.loading";
import { useInterfaceImageLoader } from "./useInterfaceImageLoader";

export function InterfaceFrame() {
  const isInterfaceImagesLoaded = useInterfaceImageLoader();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="w-full h-full p-4 sm:p-24"
    >
      <div className="w-full h-full rounded-xl shadow-sm bg-white/40 p-4 backdrop-blur-md">
        {isInterfaceImagesLoaded ? <Interface /> : <InterfaceLoading />}
      </div>
    </motion.div>
  );
}
