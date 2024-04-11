import moment from "moment";
import { useEffect, useState } from "react";
import { BellSimple } from "@phosphor-icons/react";
import { iconUrls } from "./iconUrls";

type TaskbarProps = {
  windows: string[];
};

export function Taskbar({ windows }: TaskbarProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Time format = 12:32 PM
    // Date format = 2024-04-08
    const interval = setInterval(() => {
      setTime(moment().format("hh:mm A"));
      setDate(moment().format("YYYY-MM-DD"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full p-4">
      <div className="bg-white/80 backdrop-blur-sm h-20 rounded-md flex">
        <div className="flex-1 flex items-center justify-center sm:justify-start space-x-2 p-2">
          {windows.map((window) => {
            return (
              <div className="group h-full aspect-square flex flex-col items-center rounded-md p-2 bg-white/90 shadow-sm">
                <img
                  src={iconUrls[window].src}
                  className="pointer-events-none"
                  alt={iconUrls[window].alt}
                />
                <span className="group-hover:opacity-100 opacity-0 shadow-lg absolute -top-8 text-sm bg-gray-200 text-black p-1 px-2 rounded-md transition-all duration-300 group-hover:delay-1000 pointer-events-none">
                  {iconUrls[window].label}
                </span>
              </div>
            );
          })}
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
