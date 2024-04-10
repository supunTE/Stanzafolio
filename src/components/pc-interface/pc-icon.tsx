import clsx from "clsx";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Draggable from "react-draggable";
import { iconUrls } from "./icon-urls";
import { DotsSix, DotsSixVertical } from "@phosphor-icons/react";
import { useBreakpoint } from "../../hooks";

type PCIconProps = {
  iconKey: keyof typeof iconUrls;
  clickedIcon: [string, Dispatch<SetStateAction<string>>];
  onOpened: (item: string) => void;
};

export function PCIcon({ iconKey, clickedIcon, onOpened }: PCIconProps) {
  const label = iconUrls[iconKey].label;
  const src = iconUrls[iconKey].src;
  const alt = iconUrls[iconKey].alt;

  const [clickedIconName, setClickedIcon] = clickedIcon;
  const [isDragging, setIsDragging] = useState(false);
  const pcIconRef = useRef<HTMLDivElement>(null);

  const { isSm } = useBreakpoint("sm");
  const isClicked = clickedIconName === label;

  return (
    <Draggable
      scale={1}
      bounds="parent"
      onStart={() => {
        setIsDragging(true);
      }}
      onStop={() => {
        setIsDragging(false);
      }}
      handle=".handle"
      defaultClassName="order-10"
    >
      <div
        className={clsx(
          "flex flex-col gap-2 w-20 sm:w-24 p-2 sm:p-4 rounded-lg transition-all duration-300",
          {
            "bg-blue-400/40 shadow-sm border border-gray-100/40": isClicked,
            "border-0 border-gray-100/0": !isClicked,
            "opacity-40": isDragging,
            handle: isSm,
          }
        )}
        ref={pcIconRef}
        onClick={(e) => {
          e.stopPropagation();
          setClickedIcon(label);
        }}
        onDoubleClick={() => onOpened(label.toLowerCase())}
      >
        {!isSm && isClicked && (
          <div className="w-full flex items-center justify-center handle absolute -bottom-6 left-0 bg-gray-400/40 z-40 backdrop-blur-sm rounded-md">
            <DotsSix size={20} />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className="w-full aspect-square pointer-events-none"
        />
        <div
          className={clsx(
            "text-black text-sm text-center px-1 sm:px-2 rounded-md w-full overflow-hidden",

            {
              "bg-gray-100/60 text-ellipsis": clickedIconName !== label,
              "bg-white/90": clickedIconName === label,
            }
          )}
        >
          <span
            className={clsx({ "scrolling-text": clickedIconName === label })}
          >
            {label}
          </span>
        </div>
      </div>
    </Draggable>
  );
}
