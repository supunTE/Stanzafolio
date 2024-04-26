import { create } from "zustand";

export enum MouseState {
  LINK = "link",
  DEFAULT = "default",
}

export type CursorState = {
  cursorColor: string;
  mouseState: MouseState;
  setCursorColor: (color: string) => void;
  resetCursorColor: () => void;
  setMouseState: (state: MouseState) => void;
  resetMouseState: () => void;
};

export const useCursorStore = create<CursorState>((set) => ({
  cursorColor: "black",
  mouseState: MouseState.DEFAULT,
  setCursorColor: (color) => {
    set({ cursorColor: color });
  },
  resetCursorColor: () => {
    set({ cursorColor: "black" });
  },
  setMouseState: (state) => {
    set({ mouseState: state });
  },
  resetMouseState: () => {
    set({ mouseState: MouseState.DEFAULT });
  },
}));
