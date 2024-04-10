import { useEffect, useState } from "react";

type PCIconsGridHookProps = {
  windowRef: React.RefObject<HTMLDivElement>;
};

type PCIconsGridHookResult = {
  colsNum: number;
  rowsNum: number;
};

export function usePCIconsGrid({
  windowRef,
}: PCIconsGridHookProps): PCIconsGridHookResult {
  const [colsNum, setColsNum] = useState(1);
  const [rowsNum, setRowsNum] = useState(1);

  useEffect(() => {
    const setRowsAndCols = () => {
      setColsNum(Math.floor(windowRef.current?.offsetWidth / 90));
      setRowsNum(Math.floor(windowRef.current?.offsetHeight / 110) - 2);
    };

    setRowsAndCols();

    window.addEventListener("resize", setRowsAndCols);

    return () => {
      window.removeEventListener("resize", setRowsAndCols);
    };
  }, []);

  return { colsNum, rowsNum };
}
