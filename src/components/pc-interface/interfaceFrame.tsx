import { motion } from "framer-motion";

import { Interface } from "./interface";

export function InterfaceFrame() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="w-full h-full p-4 sm:p-24"
    >
      <div className="container mx-auto w-full h-full rounded-xl shadow-sm bg-white/40 p-2 sm:p-4 backdrop-blur-md">
        <Interface />
      </div>
    </motion.div>
  );
}
