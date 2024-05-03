import { ArrowSquareOut, Folder } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { MouseState, useCursorStore } from "../../store";

import { expandVariants } from "./animationVariants";
import { myProjects, Project } from "./myExperiences";

type ProjectsProps = {
  showProjects: boolean;
};

export function Projects({ showProjects }: ProjectsProps) {
  return (
    <motion.div
      layout
      className={clsx(
        "p-1 sm:p-4 bg-neutral-100 rounded-md my-4 mt-2 gap-2 sm:gap-4 text-neutral-800",
        "grid grid-cols-1 2md:grid-cols-2 2lg:grid-cols-3 2xl:grid-cols-4 auto-rows-max"
      )}
      animate={showProjects ? "show" : "hide"}
      variants={expandVariants}
    >
      {myProjects.map((experience, index) => (
        <ProjectsBar key={index} experience={experience} />
      ))}
    </motion.div>
  );
}

function ProjectsBar({ experience }: { experience: Project }) {
  const state = useCursorStore();

  return (
    <div className="w-full relative h-52 sm:h-64 2md:h-auto 2md:aspect-square border border-neutral-300 rounded-md flex flex-col items-center justify-center">
      <TechCell experience={experience} />
      <div className="mb-8 sm:mb-4 flex items-center justify-center flex-col">
        <Folder
          size={40}
          weight="fill"
          className="w-16 h-16"
          color={experience.color}
        />
        <h2 className="text-2xl text-center font-bold">{experience.name}</h2>
      </div>
      <div className="text-xs w-full sm:text-sm absolute bottom-0 bg-neutral-200 p-2 sm:p-4 flex items-center gap-2 rounded-b-md group transition-all duration-300 hover:bg-neutral-300">
        <span className="line-clamp-2 group-hover:line-clamp-none">
          {experience.description}
        </span>
        <a
          href={experience.link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => state.setMouseState(MouseState.LINK)}
          onMouseLeave={() => state.resetMouseState()}
        >
          <ArrowSquareOut size={16} className="h-5 w-5 min-w-5 min-h-5" />
        </a>
      </div>
      {experience.team && (
        <div className="absolute left-2 top-2 bg-neutral-200 text-xs p-0.5 px-1 sm:p-1 sm:px-1.5 rounded-md">
          Team
        </div>
      )}
    </div>
  );
}

function TechCell({ experience }: { experience: Project }) {
  return (
    <div className="flex gap-2 font-normal absolute right-4 top-4">
      {experience.technologies.map((technology, index) => (
        <div className="group relative">
          <img
            key={index}
            src={technology.icon}
            alt={technology.name}
            className="w-6 h-6 object-contain"
          />
          <div className="group-hover:opacity-100 opacity-0 absolute text-xs bg-white p-1 px-2 rounded-md shadow-sm left-1/2 top-8 -translate-x-1/2 z-30 text-center transition-all duration-300">
            {technology.name}
          </div>
        </div>
      ))}
    </div>
  );
}
