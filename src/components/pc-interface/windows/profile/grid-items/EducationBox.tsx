import clsx from "clsx";

export function EducationBox() {
  return (
    <div className="h-full overflow-y-auto interface-scrollbar relative text-black flex flex-col sm:p-2 gap-2">
      <h4 className="text-xl font-bold jetbrains-mono">Education</h4>
      <div className="grid grid-cols-[30px_1fr] gap-2 gap-y-6 row-auto relative">
        <div className="absolute h-full w-0.5 ml-3.5 bg-gray-400 z-0" />
        <TimelinePoint start="2007" end="2012" />
        <div className="scale-[.8] origin-left">
          <h5 className="font-semibold">Royal College, Panadura</h5>
          <span className="text-sm text-gray-700 rounded-full">
            Primary School
          </span>
        </div>
        <TimelinePoint start="2013" end="2022" />
        <div>
          <h5 className="text-sm font-semibold flex gap-2">
            Ananda College, Colombo
          </h5>
          <span className="text-xs border-gray-300 border text-gray-700 p-1/2 px-2 rounded-full">
            High School
          </span>
          <div
            className={clsx(
              "overflow-hidden text-gray-700 mt-4 text-xs space-y-2 border-l border-gray-400 pl-2",
              "transition-all duration-300"
            )}
          >
            <div>
              GCE Ordinary Level
              <span className="text-green-700 pl-2">Passed</span>
            </div>
            <div>
              GCE Advanced Level
              <span className="text-green-700 pl-2">Passed</span>
            </div>
          </div>
        </div>
        <TimelinePoint start="2022" end="Present" active={true} />
        <div>
          <h5 className="text-sm font-semibold">
            University of Westminster, UK
          </h5>
          <h6 className="text-xs">Institute - IIT, Sri Lanka</h6>
          <span className="text-xs  border-gray-300 border text-gray-700 p-1/2 px-2 rounded-full">
            Undergraduate
          </span>
          <div
            className={clsx(
              "overflow-hidden text-gray-700 mt-4 text-xs space-y-2 border-l border-gray-400 pl-2",
              "transition-all duration-300"
            )}
          >
            <div>BEng Software Engineering</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePoint({
  start,
  end,
  active = false,
}: {
  start?: string;
  end?: string;
  active?: boolean;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center z-10 gap-0.5 group">
      <div
        className={clsx("mt-4 rounded-full flex items-center justify-center", {
          "h-6 w-6 bg-gradient-to-br from-blue-200 from-50% to-50% to-blue-400 rotate-360":
            active,
          "bg-gray-500 h-3 w-3": !active,
        })}
      >
        <div
          className={clsx("rounded-full bg-white ", {
            "w-4 h-4": active,
            "w-2 h-2": !active,
          })}
        ></div>
      </div>
      <div
        className={clsx(
          "group-hover:opacity-100 opacity-0 text-nowrap absolute left-0 transition-all duration-300 text-xs scale-90 text-center bg-white border-gray-300 border rounded-md p-1.5 text-gray-500 z-5",
          {
            "mt-10": active,
            "mt-8": !active,
          }
        )}
      >
        {start}-{end}
      </div>
    </div>
  );
}

// function ExpandArrow({
//   expanded,
//   onClick,
// }: {
//   expanded: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <ArrowCircleUp
//       size={12}
//       onClick={onClick}
//       className={clsx("text-gray-500 w-5 h-5", {
//         "rotate-180": expanded,
//       })}
//     />
//   );
// }
