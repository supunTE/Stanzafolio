import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@phosphor-icons/react";
import clsx from "clsx";

import { MouseState, useCursorStore } from "../../store";

import { Achievement, myAchievements } from "./myAchievements";

export function Timeline({
  spaceHeight,
  timelineNodesHeight,
}: {
  spaceHeight: number;
  timelineNodesHeight: number;
}) {
  const timelineNodesRef = useRef<HTMLDivElement>(null);
  const achievementCardsHeights = useRef<Record<string, { height: number }>>(
    {}
  );

  const getYears = useCallback((): string[] => {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let i = 2016; i <= currentYear; i++) {
      years.push(i.toString());
    }
    return years;
  }, []);

  const INITIAL_Y = 20;
  let y = INITIAL_Y;

  return (
    <div
      className="w-[600%] pr-28 xl:pr-4 sm:w-[400%] lg:w-[200%] h-full"
      ref={timelineNodesRef}
    >
      <div className="flex justify-between bg-neutral-200 rounded-full items-center h-full p-2">
        {getYears().map((year) => (
          <>
            <div
              key={year}
              className="flex justify-center text-sm items-center h-full aspect-square rounded-full bg-white shadow-md text-neutral-700"
            >
              {year}
            </div>
            {Array.from({ length: 12 }).map((_, month) => {
              const keyIndex = `${year}${(month + 1)
                .toString()
                .padStart(2, "0")}`;
              const prevKeyIndex =
                month === 0
                  ? `${parseInt(year) - 1}12`
                  : `${year}${month.toString().padStart(2, "0")}`;
              const isAnyAchievement = myAchievements[keyIndex];

              const prevItem = myAchievements[prevKeyIndex];

              //   TODO: Move to a logger
              //   if (isAnyAchievement) {
              //     const currentCardHeight =
              //       achievementCardsHeights?.current[keyIndex]?.height || 0;
              //     console.log({
              //       ach: myAchievements[keyIndex][0].name,
              //       y,
              //       currentCardHeight,
              //       spaceHeight,
              //       timelineNodesHeight,
              //     });
              //   }

              if (prevItem) {
                y +=
                  achievementCardsHeights?.current[prevKeyIndex]?.height + 10;
              }

              const currentCardHeight =
                achievementCardsHeights?.current[keyIndex]?.height || 0;
              if (currentCardHeight + y > spaceHeight - timelineNodesHeight) {
                y = INITIAL_Y;
              }

              return (
                <div
                  key={month}
                  className={clsx("w-1 h-1 rounded-full", {
                    "bg-white ring ring-blue-400": isAnyAchievement,
                    "bg-neutral-400": !isAnyAchievement,
                  })}
                >
                  {isAnyAchievement ? (
                    <>
                      <div className="absolute bg-gray-400/20 ml-[1px] w-0.5 bottom-12 h-full"></div>
                      <AchievementCards
                        achievements={myAchievements[keyIndex]}
                        setHeight={(height) => {
                          achievementCardsHeights.current[keyIndex] = {
                            height,
                          };
                        }}
                        y={y}
                      />
                    </>
                  ) : null}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}

function AchievementCards({
  achievements,
  setHeight,
  y,
}: {
  achievements: Achievement[];
  setHeight: (height: number) => void;
  y: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const height = containerRef.current.clientHeight;
    setHeight(height);
  }, [achievements, setHeight]);

  return (
    <div
      className="absolute sp-1 space-y-2 rounded-md interface-scrollbar flex flex-col"
      ref={containerRef}
      style={{
        top: `${y}px`,
      }}
    >
      {achievements.map((achievement, index) => {
        if (achievement.mini) {
          return <MiniCard key={index} achievement={achievement} />;
        }
        return <Card key={index} achievement={achievement} />;
      })}
    </div>
  );
}

function Card({ achievement }: { achievement: Achievement }) {
  const state = useCursorStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx(
        "group relative z-10 hover:z-40",
        "text-black bg-white max-w-[200px] min-w-[160px] p-2 shadow-md rounded-md border",
        "hover:shadow-lg hover:bg-neutral-700 hover:text-white transition-all duration-300 hover:border-transparent"
      )}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {achievement.image ? (
        <div
          className="w-16 h-16 bg-center bg-cover bg-no-repeat rounded-md mb-2"
          style={{ backgroundImage: `url(${achievement.image})` }}
        ></div>
      ) : null}
      <div
        className={clsx(
          "text-sm font-semibold jetbrains-mono flex items-baseline gap-2 whitespace-nowrap",
          { "mb-1": achievement.team || achievement.lead }
        )}
      >
        {achievement.name}{" "}
        {achievement.lead ? (
          <span className="text-xs bg-green-200 rounded-full p-0.5 px-2">
            Team Lead
          </span>
        ) : achievement.team ? (
          <span className="text-xs bg-green-200 rounded-full p-0.5 px-2">
            Team
          </span>
        ) : null}
      </div>
      <div className="text-xs">
        {achievement.label} - {achievement.month.year}
      </div>
      <div
        className={clsx(
          "left-0 absolute",
          "w-full bg-gray-200 opacity-0 rounded-md text-[11px] text-black p-2 shadow-lg border border-neutral-700",
          "group-hover:opacity-100 group-hover:scale-110",
          "transition-all duration-300",
          {
            "top-0": !achievement.image,
            "bottom-0": achievement.image,
          }
        )}
      >
        {achievement.subLabel && (
          <div className="jetbrains-mono">{achievement.subLabel}</div>
        )}
        <span className="text-gray-600">
          Organizer: {achievement.organizer}
        </span>
        {achievement.url ? (
          <div
            className="p-1 px-2 mt-2 bg-green-300 rounded-full flex items-center gap-2"
            onClick={() => {
              if (!isHovered) return;
              window.open(achievement.url, "_blank");
            }}
            onMouseOver={() => state.setMouseState(MouseState.LINK)}
            onMouseOut={() => state.resetMouseState()}
          >
            <Link size={16} className="mb-1" />
            Open Link
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MiniCard({ achievement }: { achievement: Achievement }) {
  const state = useCursorStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx(
        "group order-last scale-90 origin-left hover:z-40",
        "text-black bg-white/70 max-w-[200px] min-w-[140px] p-2 shadow-md rounded-md z-10",
        "hover:opacity-100 hover:shadow-lg hover:bg-neutral-700 hover:text-white hover:border-neutral-900",
        "transition-all duration-300"
      )}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="text-sm font-semibold jetbrains-mono flex items-baseline gap-2 whitespace-nowrap">
        {achievement.name}{" "}
        {achievement.lead ? (
          <span className="text-xs bg-green-200 rounded-full p-0.5 px-2 text-black">
            Team Lead
          </span>
        ) : achievement.team ? (
          <span className="text-xs bg-green-200 rounded-full p-0.5 px-2 text-black">
            Team
          </span>
        ) : null}
      </div>
      <div className="text-xs">
        {achievement.label} - {achievement.month.year}
      </div>
      <div
        className={clsx(
          "left-0 top-16 absolute",
          "w-full bg-gray-200 opacity-0 rounded-md text-xs text-black p-2 shadow-lg border border-neutral-700",
          "group-hover:opacity-100 group-hover:scale-110",
          "transition-all duration-300"
        )}
      >
        {achievement.subLabel && (
          <div className="jetbrains-mono">{achievement.subLabel}</div>
        )}
        <span className="text-gray-600">
          Organizer: {achievement.organizer}
          {achievement.url ? (
            <div
              className="p-1 px-2 mt-2 bg-green-300 rounded-full flex items-center gap-2"
              onClick={() => {
                if (!isHovered) return;
                window.open(achievement.url, "_blank");
              }}
              onMouseOver={() => state.setMouseState(MouseState.LINK)}
              onMouseOut={() => state.resetMouseState()}
            >
              <Link size={16} className="mb-1" />
              Open Link
            </div>
          ) : null}
        </span>
      </div>
    </div>
  );
}
