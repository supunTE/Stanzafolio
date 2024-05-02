import { useEffect, useState } from "react";

import { getWeatherData } from "../../../../../api/weather";

export function StatusBox() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [conditionIconUrl, setConditionIconUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const weatherData = await getWeatherData();
      setTemperature(weatherData.temp_c);
      setCondition(weatherData.condition.text);
      setConditionIconUrl(weatherData.condition.icon);
    })();
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full gap-3">
      <div className="bg-green-200 h-full w-full rounded-lg flex flex-col items-center justify-center">
        <h5 className="text-xl font-bold jetbrains-mono text-green-800">
          Open
        </h5>
        <div className="text-sm text-black">to work</div>
      </div>
      <div className="bg-white h-full w-full rounded-lg flex flex-col items-center justify-center">
        <h5 className="text-3xl">😇</h5>
      </div>
      <div className=" bg-white h-full w-full rounded-lg flex flex-col items-center justify-center">
        {temperature ? (
          <>
            <div className="flex items-center justify-center">
              <img
                src={conditionIconUrl}
                alt={condition}
                className="w-10 aspect-square"
              />
              <div className="text-2xl text-black relative flex flex-col items-center">
                <span>{temperature}°C</span>
              </div>
            </div>

            <p className="text-xs -mt-1 text-gray-500 text-center">
              Colombo, Sri Lanka
            </p>
          </>
        ) : (
          <div className="animate-spin h-5 w-5 bg-gradient-to-br from-blue-200 from-50% to-50% to-blue-400"></div>
        )}
      </div>
      <div className="bg-black p-1 h-full w-full rounded-lg flex flex-col items-center justify-center">
        <h5 className="text-lg text-center font-bold jetbrains-mono text-white">
          More updates
        </h5>
        <div className="text-sm text-gray-200">coming soon</div>
      </div>
    </div>
  );
}
