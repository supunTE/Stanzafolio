import { ArrowSquareOut, File } from "@phosphor-icons/react";
import clsx from "clsx";

import { MouseState, useCursorStore } from "../../store";

import { Experience, months } from "./myExperiences";

export function PositionBar({
  experience,
  last,
}: {
  experience: Experience;
  last?: boolean;
}) {
  let commonStyles = "p-4";
  if (!last) {
    commonStyles += " border-b border-neutral-400/30 z-5";
  }

  const state = useCursorStore();

  return (
    <>
      <div
        className={clsx(
          commonStyles,
          "font-semibold flex items-center text-black gap-2 group/bar"
        )}
      >
        <File size={20} weight="fill" />
        {experience.title}
        {experience.project && (
          <span className="font-normal text-sm">- {experience.project}</span>
        )}
        {experience.technologies && (
          <div className="ml-2 flex gap-2">
            {experience.technologies.map((technology, index) => (
              <div className="group relative">
                <img
                  key={index}
                  src={technology.icon}
                  alt={technology.name}
                  className="w-6 h-6 object-contain"
                />
                <div className="group-hover:opacity-100 opacity-0 absolute font-normal text-xs bg-white p-1 px-2 rounded-md shadow-sm -left-1/2 top-8 z-30 text-center transition-all duration-300">
                  {technology.name}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="relative h-full">
          {experience.description && (
            <div
              className={clsx(
                "text-black border border-neutral-700 text-sm shadow-md font-normal min-w-64 opacity-0 ",
                "group-hover/bar:opacity-100 group-hover/bar:left-8",
                "absolute -left-4 top-0 -translate-y-1/2",
                "bg-gray-200 p-2 rounded-md z-50 transition-all duration-300"
              )}
            >
              {/* arrow head towards topic */}
              <div
                className="absolute w-2 h-2 bg-gray-200 border-neutral-700 border-l border-b transform rotate-45"
                style={{ left: "-5px", top: "50%" }}
              />

              {experience.description}
            </div>
          )}
        </div>
      </div>
      <a
        className={clsx(commonStyles)}
        href={experience.company.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => state.setMouseState(MouseState.LINK)}
        onMouseLeave={() => state.resetMouseState()}
      >
        <span className="bg-blue-200 hover:bg-blue-300 transition-all duration-300 p-1 px-4 rounded-full text-black text-sm">
          {experience.company.name}{" "}
          <ArrowSquareOut size={16} className="inline" />
        </span>
      </a>
      <div className={clsx(commonStyles, "text-neutral-600 text-sm")}>
        {experience.date.map((time, index) => (
          <span key={index}>
            {time.month ? months[time.month - 0].slice(0, 3) : ""} {time.year}
            {index !== experience.date.length - 1 && " - "}
          </span>
        ))}
      </div>
    </>
  );
}
