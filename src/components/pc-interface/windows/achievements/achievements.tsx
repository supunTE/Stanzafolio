import { useEffect, useRef, useState } from "react";

import { Window } from "../window";

import { Timeline } from "./Timeline";

export function Achievements(): JSX.Element {
  const spaceRef = useRef<HTMLDivElement>(null);
  const timelineNodesRef = useRef<HTMLDivElement>(null);
  const [spaceHeight, setSpaceHeight] = useState<number>(0);
  const [timelineNodesHeight, setTimelineNodesHeight] = useState<number>(0);

  useEffect(() => {
    const space = spaceRef.current;
    setSpaceHeight(space.clientHeight || 0);
    setTimelineNodesHeight(timelineNodesRef.current?.offsetHeight || 0);

    function scrollHorizontally(e) {
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      this.scrollLeft -= delta * 400;
      e.preventDefault();
    }
    space.addEventListener("wheel", scrollHorizontally, false);

    return () => {
      space.removeEventListener("wheel", scrollHorizontally, false);
    };
  }, []);

  return (
    <Window id="achievements">
      <div
        className="flex flex-col justify-end w-full h-full relative overflow-x-scroll interface-scrollbar"
        ref={spaceRef}
      >
        <div className="h-24 p-4" ref={timelineNodesRef}>
          <Timeline
            spaceHeight={spaceHeight}
            timelineNodesHeight={timelineNodesHeight}
          />
        </div>
      </div>
    </Window>
  );
}
