import { forwardRef, useEffect } from "react";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

import { MouseState, useCursorStore } from "./store";

interface CursorProps {}

export const Cursor = forwardRef<HTMLDivElement, CursorProps>((props, ref) => {
  const controls = useAnimationControls();
  const state = useCursorStore();

  const variants = {
    scaleUpDown: {
      scale: [1, 2, 1],
      transition: { duration: 0.1 },
    },
    scaleUp: {
      scale: 2,
      transition: { duration: 0.1 },
    },
    scaleDown: {
      scale: 1,
      transition: { duration: 0.1 },
    },
  };

  useEffect(() => {
    const handleSingleClick = () => {
      controls.start("scaleUpDown");
    };

    window.addEventListener("click", handleSingleClick);

    return () => {
      window.removeEventListener("click", handleSingleClick);
    };
  }, []);

  useEffect(() => {
    if (state.mouseState === MouseState.LINK) {
      controls.start("scaleUp");
    } else {
      controls.start("scaleDown");
    }
  }, [state.mouseState]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      animate={controls}
      style={{
        background: state.cursorColor || "black",
      }}
      className="absolute z-50 w-4 h-4 flex items-center justify-center rounded-full ring-offset-2 ring-2 pointer-events-none touch-none transition-all duration-300"
    >
      <AnimatePresence>
        {state.mouseState === MouseState.LINK ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
          >
            <ArrowSquareOut size={10} className="text-white" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
});
