import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { create } from "zustand";

import { iconUrls } from "./iconUrls";

type iconUrlKeys = keyof typeof iconUrls;

export type WindowManagerState = {
  activeWindows: iconUrlKeys[];
  allWindows: iconUrlKeys[];
  replaceWindows: (
    activeWindows: iconUrlKeys[],
    allWindows: iconUrlKeys[]
  ) => void;
  openWindow: (window: iconUrlKeys) => void;
  minimizeWindow: (window: iconUrlKeys) => void;
  closeWindow: (window: iconUrlKeys) => void;
};

const wmStore = create<WindowManagerState>((set) => ({
  // All active windows without minimized according to the order of z layer (last one is the top one)
  activeWindows: [] as iconUrlKeys[],
  // ALl windows including minimized ones according to the order of opening (last one is the top one)
  allWindows: [] as iconUrlKeys[],

  replaceWindows: (activeWindows: iconUrlKeys[], allWindows: iconUrlKeys[]) => {
    set({ activeWindows, allWindows });
  },

  openWindow: (window) => {
    console.log("open", window);
    set((state) => {
      if (state.activeWindows.includes(window)) {
        // bring to top in z layer
        return {
          activeWindows: [
            ...state.activeWindows.filter((w) => w !== window),
            window,
          ],
          allWindows: state.allWindows,
        };
      }
      if (state.allWindows.includes(window)) {
        return {
          activeWindows: [...state.activeWindows, window],
          allWindows: state.allWindows,
        };
      }
      return {
        activeWindows: [...state.activeWindows, window],
        allWindows: [...state.allWindows, window],
      };
    });
  },

  minimizeWindow: (window) => {
    console.log("minimize", window);
    set((state) => {
      if (!state.activeWindows.includes(window)) {
        return;
      }
      return {
        activeWindows: state.activeWindows.filter((w) => w !== window),
        allWindows: state.allWindows,
      };
    });
  },

  closeWindow: (window) => {
    console.log("close", window);
    set((state) => {
      return {
        activeWindows: state.activeWindows.filter((w) => w !== window),
        allWindows: state.allWindows.filter((w) => w !== window),
      };
    });
  },
}));

export function useWindowManagerStore() {
  const state = wmStore();
  const [_searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const activeWindowsParam = state.activeWindows.join(",");
    const allWindowsParam = state.allWindows.join(",");
    setSearchParams(
      `?activeWindows=${activeWindowsParam}&allWindows=${allWindowsParam}`
    );
  }, [setSearchParams, state.activeWindows, state.allWindows]);

  return wmStore();
}
