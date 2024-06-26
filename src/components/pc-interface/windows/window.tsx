import { ReactNode, useEffect, useState } from "react";
import { ArrowsInSimple, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { iconUrls, useWindowManagerStore } from "../store";

type WindowProps = {
  id: string;
  children?: ReactNode;
};

export function Window({ id, children = null }: WindowProps) {
  const state = useWindowManagerStore();

  const [closeClicked, setCloseClicked] = useState(false);
  useEffect(() => {
    if (!closeClicked) return;
    const closeClickTimeout = setTimeout(() => {
      setCloseClicked(false);
    }, 2000);

    return () => {
      clearTimeout(closeClickTimeout);
    };
  }, [closeClicked]);

  return (
    <motion.div
      className="w-full h-full p-2 sm:p-4 pt-0 sm:pt-4 absolute z-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className="bg-[#e6ffed]/80 backdrop-blur-xl flex flex-col border border-white shadow-sm w-full h-full rounded-md overflow-hidden">
        <div className="flex justify-between items-center bg-[#77ff9d] text-black p-2">
          <h1 className="text-sm font-bold px-2 flex items-center gap-2">
            <img
              src={iconUrls[id].src}
              alt={iconUrls[id].alt}
              className="w-6 h-6"
            />
            {iconUrls[id].label}
          </h1>
          <div className="flex gap-2 relative">
            <div
              onClick={() => {
                state.minimizeWindow(id);
              }}
              className="bg-white hover:bg-gray-200 hover:scale-125 transition-all duration-300 p-1 shadow-sm rounded-md flex items-center justify-center aspect-square h-full"
            >
              <ArrowsInSimple size={16} />
            </div>
            <div
              onClick={() => {
                setCloseClicked(true);
              }}
              onDoubleClick={() => {
                state.closeWindow(id);
              }}
              className="bg-white p-1 hover:bg-red-500 hover:text-white hover:scale-125 transition-all duration-300 shadow-sm rounded-md flex items-center justify-center aspect-square h-full"
            >
              <X size={16} />
            </div>
            <motion.div
              className={clsx(
                "absolute top-7 p-0.5 px-2 shadow-md rounded-full right-0 z-40 text-xs bg-white text-black flex gap-1 text-nowrap items-center origin-top-right"
              )}
              animate={{
                opacity: closeClicked ? 1 : 0,
                scale: closeClicked ? 1 : 0,
              }}
            >
              Double click/tap to close
            </motion.div>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
