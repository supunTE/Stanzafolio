import { BatteryFull, Vibrate, WifiMedium } from "@phosphor-icons/react";

import { useTime } from "./hooks";

export function StatusBar() {
  const { time, date } = useTime();

  return (
    <div className="h-16 p-4">
      <div className="flex relative items-center justify-between bg-white text-black h-full w-full rounded-full">
        <div></div>
        <div className="flex justify-center w-full gap-4">
          <div className="text-sm font-bold">{date}</div>
          <div className="text-sm font-bold">{time}</div>
        </div>
        <div className="flex gap-1 px-4">
          <Vibrate size={16} weight="fill" />
          <BatteryFull size={16} weight="fill" />
          <WifiMedium size={16} weight="fill" />
        </div>
      </div>
    </div>
  );
}
