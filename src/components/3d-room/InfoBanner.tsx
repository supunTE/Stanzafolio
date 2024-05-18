import { useEffect, useRef, useState } from "react";
import { Info } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import useLocalStorage from "use-local-storage";

import { HoverMaintainer } from "../utils";

export function InfoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [firstVisit, setFirstVisit] = useLocalStorage("firstVisit", true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stopPropagation = (e: MouseEvent) => {
      if (e.target != spanRef.current) {
        e.stopPropagation();
      } else {
        HoverMaintainer.setClickedGroup("Computer");
        setShowBanner(false);
      }
    };

    if (firstVisit) setShowBanner(true);
    setFirstVisit(false);

    const banner = bannerRef.current;

    // Avoid events through the banner
    banner.addEventListener("click", stopPropagation);
    // bannerRef.current?.addEventListener("pointerdown", stopPropagation);

    return () => {
      banner.removeEventListener("click", stopPropagation);
      //   bannerRef.current?.removeEventListener("pointerdown", stopPropagation);
    };
  }, []);

  const bannerAnimationVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <div className="w-full h-full relative cursor-default">
      <Info
        onClick={() => setShowBanner((prev) => !prev)}
        className="absolute right-4 top-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 text-black p-1 rounded-full"
      />
      <motion.div
        ref={bannerRef}
        className="absolute inset-x-2 sm:right-16 sm:inset-x-auto top-16 p-12 mx-auto origin-top-right bg-white text-black flex flex-col items-center justify-center rounded-3xl"
        initial={"hidden"}
        animate={showBanner ? "visible" : "hidden"}
        variants={bannerAnimationVariants}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-lg">Welcome to</h4>
        <h1 className="text-4xl sm:text-7xl jetbrains-mono">Stanzafolio</h1>
        <p className="text-sm sm:text-lg text-center">
          Supun Tharinda's Portfolio Website
        </p>

        <div className="max-w-96 mt-6 text-neutral-600 text-center">
          <span>
            Click on the
            <span
              ref={spanRef}
              className="bg-green-200 rounded-md px-2 py-1 mx-2 cursor-pointer"
            >
              {" "}
              computer 🖥️{" "}
            </span>
            to view the portfolio. Or, just explore the room by clicking on the
            objects.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
