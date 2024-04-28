import clsx from "clsx";

import { CountryBox } from "./grid-items/CountryBox";
import { DownloadCV } from "./grid-items/DownloadCV";
import { EducationBox } from "./grid-items/EducationBox";
import { FlappyBox } from "./grid-items/FlappyBox";
import { LanguageBox } from "./grid-items/LanguageBox";

export function ProfileInfo(): JSX.Element {
  const boxCss =
    "bg-white rounded-lg shadow-sm hover:shadow-md ring-2 ring-transparent hover:ring-blue-400 transition-all duration-300";

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 auto-rows-[200px] p-4 gap-4 interface-scrollbar sm:overflow-y-scroll h-full">
      <div className={clsx(boxCss, "p-4 row-span-2")}>
        <CountryBox />
      </div>
      <div className={clsx(boxCss, "p-4")}>
        <LanguageBox />
      </div>
      <div className={clsx(boxCss, "p-4 row-span-2")}>
        <EducationBox />
      </div>
      <div className={clsx(boxCss, "overflow-hidden")}>
        <DownloadCV />
      </div>
      <div className={clsx(boxCss, "overflow-hidden")}>
        <FlappyBox />
      </div>
    </div>
  );
}

// about website
// soft skills
// interests
