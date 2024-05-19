import clsx from "clsx";

import { AboutBox } from "./grid-items/AboutBox";
import { CountryBox } from "./grid-items/CountryBox";
import { DownloadCV } from "./grid-items/DownloadCV";
import { EducationBox } from "./grid-items/EducationBox";
import { FlappyBox } from "./grid-items/FlappyBox";
import { InterestsBox } from "./grid-items/InterestsBox";
import { LanguageBox } from "./grid-items/LanguageBox";
import { QuoteBox } from "./grid-items/QuoteBox";
import { StatusBox } from "./grid-items/StatusBox";

export function ProfileInfo(): JSX.Element {
  const boxCss =
    "bg-white rounded-lg shadow-sm hover:shadow-md ring-2 ring-transparent hover:ring-blue-400 transition-all duration-300";

  return (
    <div className="grid lg:grid-cols-1 2lg:grid-cols-2 2xl:grid-cols-3 auto-rows-[200px] p-4 gap-4 interface-scrollbar sm:overflow-y-scroll h-full">
      <div className={clsx(boxCss, "p-4 row-span-2 overflow-hidden")}>
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
      <div className={clsx(boxCss, "overflow-hidden order-11 sm:order-none")}>
        <FlappyBox />
      </div>
      <div
        className={clsx(
          boxCss,
          "p-4 2lg:col-span-2 2lg:order-10 2xl:order-none"
        )}
      >
        <InterestsBox />
      </div>
      <div className={clsx()}>
        <StatusBox />
      </div>
      <div className={clsx(boxCss, "p-4 2lg:order-10 2xl:order-none")}>
        <QuoteBox />
      </div>
      <div className={clsx(boxCss, "order-12 overflow-hidden")}>
        <AboutBox />
      </div>
    </div>
  );
}

// contact
// small bio (age) / emoji / update coming soon/ open to work
