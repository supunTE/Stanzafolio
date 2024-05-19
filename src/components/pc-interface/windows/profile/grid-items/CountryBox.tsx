import { useState } from "react";

import { assets } from "../../../../../assets";

import { CountryBoxLoading } from "./loading/CountryBox.loading";

export function CountryBox() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full relative">
      {isLoading && <CountryBoxLoading />}
      <iframe
        title="map"
        onLoad={() => setIsLoading(false)}
        className="w-full h-full rounded-lg"
        src="https://www.openstreetmap.org/export/embed.html?bbox=19.599609375000004%2C-32.9164853473144%2C139.92187500000003%2C43.77109381775651&amp;layer=cyclosm&amp;marker=6.926426847059551%2C79.7607421875"
      ></iframe>
      <div className="bg-white p-1.5 rounded-md z-5 absolute top-2 sm:top-5 right-2 sm:right-5 flex flex-col items-center gap-1">
        <img className="h-10" src={assets.sriLankanFlag} alt="profile-img" />
        <span className="text-black text-sm font-semibold">Sri Lanka</span>
      </div>
    </div>
  );
}
