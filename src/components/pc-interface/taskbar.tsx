import { BellSimple } from "@phosphor-icons/react";
import clsx from "clsx";

import { useTime } from "./hooks";
import { iconUrls, useWindowManagerStore } from "./store";

export function Taskbar() {
  const { time, date } = useTime();

  const state = useWindowManagerStore();
  const isActiveWindow = (window: string) => {
    if (state.activeWindows.length === 0) return false;
    return state.activeWindows[state.activeWindows.length - 1] === window;
  };

  return (
    <div className="w-full">
      <div className="bg-white/80 border-white border backdrop-blur-sm h-20 rounded-md flex">
        <div className="flex-1 flex items-center justify-center sm:justify-start space-x-2 p-2">
          {state.allWindows.map((window) => {
            return (
              <div
                key={window}
                onClick={
                  isActiveWindow(window)
                    ? () => state.minimizeWindow(window)
                    : () => state.openWindow(window)
                }
                className={clsx(
                  "group h-full aspect-square transition-all border-transparent border duration-300 flex flex-col items-center rounded-md p-2 shadow-sm",
                  {
                    "bg-white/90 hover:border-gray-400 hover:shadow-md":
                      isActiveWindow(window),
                    "bg-gray-100/40 hover:border-gray-400":
                      !isActiveWindow(window),
                  }
                )}
              >
                <img
                  src={iconUrls[window].src}
                  className="pointer-events-none"
                  alt={iconUrls[window].alt}
                />
                <span className="group-hover:opacity-100 opacity-0 shadow-lg absolute -top-4 text-xs bg-white text-black p-1 px-2 rounded-md transition-all duration-300 group-hover:delay-1000 pointer-events-none z-40">
                  {iconUrls[window].label}
                </span>
              </div>
            );
          })}

          {state.allWindows.length === 0 && (
            <div className="text-black/40 text-xs sm:hidden">No tabs open</div>
          )}
        </div>
        <div className="gap-4 px-4 hidden sm:flex">
          <div className="flex flex-col items-center justify-center">
            <div className="text-black text-lg font-bold">{time}</div>
            <div className="text-black text-sm">{date}</div>
          </div>
          <div className="flex items-center justify-center">
            <BellSimple
              size={32}
              className=" bg-gray-100 shadow-sm text-black p-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
