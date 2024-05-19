import { useEffect, useState } from "react";

type PCIconsGridHookProps = {
  windowRef: React.RefObject<HTMLDivElement>;
  isInterfaceImagesLoaded: boolean;
};

type PCIconsGridHookResult = {
  colsNum: number;
  rowsNum: number;
  gridAvailable: boolean;
};

export function usePCIconsGrid({
  windowRef,
  isInterfaceImagesLoaded,
}: PCIconsGridHookProps): PCIconsGridHookResult {
  const [colsNum, setColsNum] = useState(1);
  const [rowsNum, setRowsNum] = useState(1);
  const [gridAvailable, setGridAvailable] = useState(false);

  useEffect(() => {
    setGridAvailable(false);
    if (!windowRef.current) return;

    const setRowsAndCols = () => {
      setColsNum(Math.floor(windowRef.current?.offsetWidth / (96 + 16)));
      setRowsNum(Math.floor(windowRef.current?.offsetHeight / 110) - 2);
    };

    setRowsAndCols();

    window.addEventListener("resize", setRowsAndCols);
    setGridAvailable(true);

    return () => {
      window.removeEventListener("resize", setRowsAndCols);
    };
  }, [windowRef, isInterfaceImagesLoaded]);

  return { colsNum, rowsNum, gridAvailable };
}
