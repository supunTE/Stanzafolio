import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import desktopBackground from "../../assets/desktop-background.jpg";
import { Taskbar } from "./taskbar";
import { PCIcon } from "./pc-icon";
import { usePCIconsGrid } from "./utils/pc-icons-grid.util";

export function Interface() {
  const windowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const windowFrame = windowRef.current;

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      const x =
        e.type === "touchmove"
          ? (e as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;
      const y =
        e.type === "touchmove"
          ? (e as TouchEvent).touches[0].clientY
          : (e as MouseEvent).clientY;

      const rect = windowFrame.getBoundingClientRect();

      const offsetX =
        rect.left > x ? 0 : rect.right < x ? rect.width : x - rect.left;
      const offsetY =
        rect.top > y ? 0 : rect.bottom < y ? rect.height : y - rect.top;
      const cursorX = offsetX - cursorRef.current.clientWidth / 2;
      const cursorY = offsetY - cursorRef.current.clientHeight / 2;

      const keyframes = { top: `${cursorY}px`, left: `${cursorX}px` };

      cursorRef.current.animate(keyframes, {
        duration: 100,
        fill: "forwards",
        easing: "ease-out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove);
    };
  }, []);

  const clickedIcon = useState<string>("");
  const [clickedIconName, setClickedIcon] = clickedIcon;
  const [openedWindows, setOpenedWindows] = useState<string[]>([]);

  console.log(clickedIconName);

  const addItemToOpenedWindows = (item: string) => {
    setOpenedWindows((prev) => {
      if (prev.includes(item)) {
        return prev.filter((prevItem) => prevItem !== item);
      }
      return [...prev, item];
    });
  };

  const { colsNum, rowsNum } = usePCIconsGrid({ windowRef });

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="w-full h-full p-4 sm:p-24"
    >
      <div className="w-full h-full rounded-xl shadow-sm bg-white/40 p-4 backdrop-blur-md">
        {/* Photo by <a href="https://unsplash.com/@stefanbc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Stefan Cosma</a> on <a href="https://unsplash.com/photos/green-trees-on-green-grass-field-under-blue-sky-during-daytime-LkvjxaP5wNg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
        <div
          ref={windowRef}
          className="bg-cover rounded-xl shadow-sm border overflow-hidden border-gray-200 w-full h-full flex flex-col relative"
          style={{ backgroundImage: `url(${desktopBackground})` }}
          onClick={() => {
            setClickedIcon("");
          }}
        >
          <div
            ref={cursorRef}
            className="bg-black z-50 absolute w-4 h-4 rounded-full ring-offset-2 ring-2 pointer-events-none touch-none"
          />

          <div
            className="flex-1 grid justify-items-center items-center gap-2 p-4"
            style={{
              gridTemplateColumns: `repeat(${colsNum}, 1fr)`,
              gridTemplateRows: `repeat(${rowsNum}, 1fr)`,
            }}
          >
            <PCIcon
              clickedIcon={clickedIcon}
              onOpened={(item: string) => {
                addItemToOpenedWindows(item);
              }}
              iconKey="profile"
            />
            <PCIcon
              clickedIcon={clickedIcon}
              onOpened={(item: string) => {
                addItemToOpenedWindows(item);
              }}
              iconKey="achievements"
            />
            <PCIcon
              clickedIcon={clickedIcon}
              onOpened={(item: string) => {
                addItemToOpenedWindows(item);
              }}
              iconKey="experiences"
            />
            <PCIcon
              clickedIcon={clickedIcon}
              onOpened={(item: string) => {
                addItemToOpenedWindows(item);
              }}
              iconKey="skills"
            />
          </div>
          <Taskbar windows={openedWindows} />
        </div>
      </div>
    </motion.div>
  );
}
