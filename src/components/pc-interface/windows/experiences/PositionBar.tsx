import { useState } from "react";
import { ArrowSquareOut, File, Info } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";

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
    commonStyles += " border-b border-neutral-400/30";
  }

  const [infoHovered, setInfoHovered] = useState(false);
  console.log(infoHovered);
  const infoAnimationVariants = {
    show: {
      opacity: 1,
      visibility: "visible" as const,
      display: "block",
      left: 36,
      transition: {
        duration: 0.3,
      },
    },
    hide: {
      opacity: 0.2,
      visibility: "hidden" as const,
      display: "none",
      left: 48,
      transition: {
        duration: 0.3,
      },
    },
  };
  const infoAnimationVariantsFromBottom = {
    show: {
      opacity: 1,
      visibility: "visible" as const,
      display: "block",
      bottom: 0,
      transition: {
        duration: 0.3,
      },
    },
    hide: {
      opacity: 0.2,
      visibility: "hidden" as const,
      display: "none",
      bottom: 8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <div
        className={clsx(
          commonStyles,
          "font-semibold flex flex-col group/bar relative"
        )}
      >
        <div className="flex items-center text-black gap-2 xl:flex-row">
          <div className="flex flex-1 lg:flex-none xl:flex-1 flex-col md:flex-row md:items-center gap-2">
            <div className="flex items-center gap-2">
              <File size={20} weight="fill" className="w-6 h-6" />
              {experience.title}
            </div>
            {experience.project && (
              <span className="font-normal text-sm">
                <span className="hidden md:inline-block pr-2">{" - "}</span>
                {experience.project}
              </span>
            )}
          </div>

          {experience.technologies && (
            <div className="hidden xl:block">
              <TechCell experience={experience} />
            </div>
          )}

          {experience.description && (
            <div className="hidden lg:block relative h-full">
              <div
                className="p-0.5 bg-gray-200 rounded-full ml-1"
                onMouseOver={() => setInfoHovered(true)}
                onMouseLeave={() => setInfoHovered(false)}
              >
                <Info size={16} className="w-5 h-5 text-neutral-500 z-40" />
              </div>
              <motion.div
                className={clsx(
                  "text-black border border-neutral-700 text-sm shadow-md font-normal min-w-64",
                  "absolute top-2 -translate-y-1/2 pointer-events-none",
                  "bg-gray-200 p-2 rounded-md z-50 transition-all duration-300"
                )}
                variants={infoAnimationVariants}
                animate={infoHovered ? "show" : "hide"}
              >
                {/* arrow head towards topic */}
                <div className="absolute w-2 h-2 left-[-5px] top-1/2 bg-gray-200 border-neutral-700 border-l border-b transform rotate-45" />
                {experience.description}
              </motion.div>
            </div>
          )}

          {experience.description && (
            <div className="block lg:hidden h-full">
              <div
                className="p-0.5 bg-gray-200 rounded-full ml-1"
                onMouseOver={() => setInfoHovered(true)}
                onMouseLeave={() => setInfoHovered(false)}
              >
                <Info size={16} className="w-5 h-5 text-neutral-500 z-40" />
              </div>
              <motion.div
                className={clsx(
                  "text-black border border-neutral-700 text-sm shadow-md font-normal opacity-0",
                  "w-full lg:min-w-64",
                  // "peer-hover:opacity-100 peer-hover:-bottom-4 bottom-6",
                  "absolute left-0",
                  "bg-gray-200 p-2 rounded-md z-50 transition-all duration-300"
                )}
                variants={infoAnimationVariantsFromBottom}
                animate={infoHovered ? "show" : "hide"}
              >
                {/* arrow head towards topic */}
                <div className="absolute w-2 h-2 top-[-5px] lg:left-[-5px] lg:top-1/2 bg-gray-200 border-neutral-700 border-l border-b transform rotate-[135deg] lg:rotate-45" />

                {experience.description}
              </motion.div>
            </div>
          )}
        </div>

        <div className="block 2xl:hidden text-sm font-normal md:ml-7 text-neutral-400">
          <TimeCell experience={experience} />
        </div>

        {experience.technologies && (
          <div className="inline xl:hidden md:ml-7 mt-4">
            <TechCell experience={experience} />
          </div>
        )}

        <div
          className={clsx(
            "md:ml-7 my-4",
            "block xl:hidden items-center text-neutral-600 text-xs sm:text-sm"
          )}
        >
          <OrganizationCell experience={experience} />
        </div>
      </div>

      <div
        className={clsx(
          "p-4",
          "hidden xl:block items-center text-neutral-600 text-sm",
          { "border-b border-neutral-400/30 z-5": !last }
        )}
      >
        <OrganizationCell experience={experience} />
      </div>
      <div
        className={clsx(
          " p-4 text-neutral-600 text-sm",
          {
            "border-b border-neutral-400/30 z-5": !last,
          },
          "hidden 2xl:inline"
        )}
      >
        <TimeCell experience={experience} />
      </div>
    </>
  );
}

function TimeCell({ experience }: { experience: Experience }) {
  const timeData = experience.date;
  return (
    <>
      {timeData.map((time, index) => (
        <span key={index}>
          {time.month ? months[time.month - 0].slice(0, 3) : ""} {time.year}
          {index !== timeData.length - 1 && " - "}
        </span>
      ))}
    </>
  );
}

function OrganizationCell({ experience }: { experience: Experience }) {
  const state = useCursorStore();

  return (
    <a
      href={experience.company.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => state.setMouseState(MouseState.LINK)}
      onMouseLeave={() => state.resetMouseState()}
    >
      <span className="bg-blue-200 hover:bg-blue-300 transition-all duration-300 font-normal p-1 px-2 sm:px-4 rounded-full text-black">
        {experience.company.name}{" "}
        <ArrowSquareOut size={16} className="inline" />
      </span>
    </a>
  );
}

function TechCell({ experience }: { experience: Experience }) {
  return (
    <div className="flex gap-2 font-normal">
      {experience.technologies.map((technology, index) => (
        <div className="group relative">
          <img
            key={index}
            src={technology.icon}
            alt={technology.name}
            className="w-6 h-6 object-contain"
          />
          <div className="group-hover:opacity-100 opacity-0 absolute text-xs bg-white p-1 px-2 rounded-md shadow-sm left-1/2 top-8 -translate-x-1/2 z-30 text-center transition-all duration-300 hidden group-hover:block">
            {technology.name}
          </div>
        </div>
      ))}
    </div>
  );
}
