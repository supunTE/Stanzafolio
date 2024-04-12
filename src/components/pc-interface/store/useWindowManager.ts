import { create } from "zustand";

import { iconUrls } from "./iconUrls";

type iconUrlKeys = keyof typeof iconUrls;

export type WindowManagerState = {
  activeWindows: iconUrlKeys[];
  allWindows: iconUrlKeys[];
  openWindow: (window: iconUrlKeys) => void;
  minimizeWindow: (window: iconUrlKeys) => void;
  closeWindow: (window: iconUrlKeys) => void;
};

export const useWindowManagerStore = create<WindowManagerState>((set) => ({
  // All active windows without minimized according to the order of z layer (last one is the top one)
  activeWindows: [] as iconUrlKeys[],
  // ALl windows including minimized ones according to the order of opening (last one is the top one)
  allWindows: [] as iconUrlKeys[],

  openWindow: (window) => {
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
    set((state) => {
      return {
        activeWindows: state.activeWindows.filter((w) => w !== window),
        allWindows: state.allWindows.filter((w) => w !== window),
      };
    });
  },
}));
