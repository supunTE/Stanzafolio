import clsx from "clsx";

import { assets } from "../../../../../assets";
import { MouseState, useCursorStore } from "../../../store";

export function DownloadCV() {
  const cursorState = useCursorStore();

  return (
    <div className="h-full w-full relative text-black flex flex-col justify-center items-center sm:p-2 gap-2 bg-violet-500">
      <div
        className={clsx(
          "text-xl font-bold p-2 rounded-full px-6 bg-white jetbrains-mono flex gap-2 items-center justify-center z-10",
          "hover:bg-violet-800 transition-all duration-300 hover:text-white cursor-pointer hover:shadow-lg"
        )}
        onMouseEnter={() => {
          cursorState.setMouseState(MouseState.DOWNLOAD);
        }}
        onMouseLeave={() => {
          cursorState.resetMouseState();
        }}
      >
        Download CV
      </div>
      <img
        src={assets.documentIcon}
        alt="document icon"
        className="absolute h-full opacity-10 select-none pointer-events-none"
      />
    </div>
  );
}
