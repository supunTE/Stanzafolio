import { useEffect, useState } from "react";
import { Heart } from "@phosphor-icons/react";
import clsx from "clsx";

import { HoverMaintainer } from "../utils";

export function AboutLabel() {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const modelKey = "Room";
    const lightUpKeys = ["Bulb"];
    const onClickedGroupChanged = () => {
      setIsClicked(
        HoverMaintainer.isClicked(modelKey) ||
          HoverMaintainer.checkForClickedGroups(lightUpKeys)
      );
    };
    HoverMaintainer.HoverEmitter.on(
      "clickedGroupChanged",
      onClickedGroupChanged
    );

    return () => {
      HoverMaintainer.HoverEmitter.off(
        "clickedGroupChanged",
        onClickedGroupChanged
      );
    };
  }, []);

  return (
    <div
      className={clsx("transition-colors duration-300", {
        "text-black": !isClicked,
        "text-white": isClicked,
      })}
    >
      <h1 className="text-xs flex items-center gap-1">
        Made with
        <span>
          <Heart size={12} className="text-red-500" weight="fill" />
        </span>
        by
        <a
          className="font-semibold z-50 hover:bg-white bg-white/20 rounded-full p-1 px-2 underline-offset-2 transition-all duration-300 hover:text-black"
          href="https://github.com/supunTE"
          target="_blank"
          rel="noreferrer"
        >
          Supun Tharinda
        </a>
      </h1>
    </div>
  );
}
