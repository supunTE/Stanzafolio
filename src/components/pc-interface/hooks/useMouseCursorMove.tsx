import { RefObject, useEffect } from "react";

type UseMouseCursorMoveHookProps = {
  windowRef: RefObject<HTMLDivElement>;
  cursorRef: RefObject<HTMLDivElement>;
  isInterfaceImagesLoaded: boolean;
};

export const useMouseCursorMove = ({
  windowRef,
  cursorRef,
  isInterfaceImagesLoaded,
}: UseMouseCursorMoveHookProps) => {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      const windowFrame = windowRef.current;
      if (!cursorRef.current || !windowFrame) return;

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
        duration: 10,
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
  }, [isInterfaceImagesLoaded]);
};
