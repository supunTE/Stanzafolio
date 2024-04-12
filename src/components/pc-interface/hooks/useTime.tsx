import { useEffect, useState } from "react";
import moment from "moment";

export function useTime() {
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

  return { time, date };
}
