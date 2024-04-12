import { useRef, useState } from "react";

import { assets } from "../../assets";
import { useBreakpoint } from "../../hooks";

import { usePCIconsGrid } from "./utils/pc-icons-grid.util";
import { useInterfaceImageLoader, useMouseCursorMove } from "./hooks";
import { InterfaceLoading } from "./interface.loading";
import { PCIcon } from "./PCIcon";
import { StatusBar } from "./statusBar";
import { Taskbar } from "./taskbar";

export function Interface() {
  const windowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const { isSm } = useBreakpoint("sm");

  const isInterfaceImagesLoaded = useInterfaceImageLoader();
  const { colsNum, rowsNum } = usePCIconsGrid({
    windowRef,
    isInterfaceImagesLoaded,
  });

  useMouseCursorMove({
    windowRef,
    cursorRef,
    isInterfaceImagesLoaded,
  });

  const clickedIcon = useState<string>("");
  const [_clickedIconName, setClickedIcon] = clickedIcon;
  const [openedWindows, setOpenedWindows] = useState<string[]>([]);

  const addItemToOpenedWindows = (item: string) => {
    setOpenedWindows((prev) => {
      if (prev.includes(item)) {
        return prev.filter((prevItem) => prevItem !== item);
      }
      return [...prev, item];
    });
  };

  if (!isInterfaceImagesLoaded) return <InterfaceLoading />;

  return (
    <>
      {/* Photo by <a href="https://unsplash.com/@stefanbc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Stefan Cosma</a> on <a href="https://unsplash.com/photos/green-trees-on-green-grass-field-under-blue-sky-during-daytime-LkvjxaP5wNg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
      <div
        ref={windowRef}
        className="bg-cover rounded-xl shadow-sm border overflow-hidden border-gray-200 w-full h-full flex flex-col relative"
        style={{ backgroundImage: `url(${assets.desktopBackground})` }}
        onClick={() => {
          setClickedIcon("");
        }}
      >
        <div
          ref={cursorRef}
          className="bg-black z-50 absolute w-4 h-4 rounded-full ring-offset-2 ring-2 pointer-events-none touch-none"
        />

        {!isSm && <StatusBar />}

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
    </>
  );
}
