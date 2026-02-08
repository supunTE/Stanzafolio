import { ArrowSquareOut, Certificate } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { MouseState, useCursorStore } from "../../store";

import { expandVariants } from "./animationVariants";
import { Certification, months, myCertifications } from "./myExperiences";

type CertificationsProps = {
  showCertifications: boolean;
};

export function Certifications({ showCertifications }: CertificationsProps) {
  const titlebarStyles = "px-4 py-2 text-sm text-neutral-500 font-semibold";

  return (
    <motion.div
      layout
      className={clsx(
        "p-1 sm:p-4 bg-neutral-100 rounded-md my-4 mt-2 gap-y-2 text-neutral-800",
        "grid grid-cols-1",
        "xl:grid-cols-[minmax(400px,_1fr)_400px] 2xl:grid-cols-[minmax(400px,_1fr)_400px_200px]",
      )}
      animate={showCertifications ? "show" : "hide"}
      variants={expandVariants}
    >
      <div className={clsx(titlebarStyles, "hidden xl:block")}>Title</div>
      <div className={clsx(titlebarStyles, "hidden xl:block")}>Issuer</div>
      <div className={clsx(titlebarStyles, "hidden 2xl:block")}>Date</div>
      {myCertifications.map((certification, index) => (
        <CertificationBar
          key={index}
          certification={certification}
          last={index === myCertifications.length - 1}
        />
      ))}
    </motion.div>
  );
}

function CertificationBar({
  certification,
  last,
}: {
  certification: Certification;
  last?: boolean;
}) {
  const commonStyles = clsx("p-4", { "border-b border-neutral-400/30": !last });

  return (
    <>
      <div className={clsx(commonStyles, "font-semibold flex flex-col")}>
        <div className="flex items-center gap-2 text-black">
          <Certificate size={20} weight="fill" className="w-6 h-6" />
          {certification.credentialUrl ? (
            <CertificationLink
              url={certification.credentialUrl}
              label={certification.title}
            />
          ) : (
            certification.title
          )}
        </div>
        <div className="block 2xl:hidden text-sm font-normal ml-7 text-neutral-400">
          <DateCell date={certification.date} />
        </div>
        <div className="block xl:hidden ml-7 mt-2">
          <IssuerCell certification={certification} />
        </div>
      </div>

      <div
        className={clsx(
          "p-4",
          "hidden xl:block items-center text-neutral-600 text-sm",
          { "border-b border-neutral-400/30": !last },
        )}
      >
        <IssuerCell certification={certification} />
      </div>

      <div
        className={clsx("p-4 text-neutral-600 text-sm", {
          "border-b border-neutral-400/30": !last,
          "hidden 2xl:inline": true,
        })}
      >
        <DateCell date={certification.date} />
      </div>
    </>
  );
}

function DateCell({ date }: { date: Certification["date"] }) {
  if (date.present) return <span>Present</span>;
  return (
    <span>
      {date.month ? months[date.month - 0].slice(0, 3) : ""} {date.year}
    </span>
  );
}

function IssuerCell({ certification }: { certification: Certification }) {
  const state = useCursorStore();

  if (!certification.issuerUrl) {
    return (
      <span className="bg-neutral-200 font-normal p-1 px-2 sm:px-4 rounded-full text-black">
        {certification.issuer}
      </span>
    );
  }

  return (
    <a
      href={certification.issuerUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => state.setMouseState(MouseState.LINK)}
      onMouseLeave={() => state.resetMouseState()}
    >
      <span className="bg-blue-200 hover:bg-blue-300 transition-all duration-300 font-normal p-1 px-2 sm:px-4 rounded-full text-black">
        {certification.issuer} <ArrowSquareOut size={16} className="inline" />
      </span>
    </a>
  );
}

function CertificationLink({ url, label }: { url: string; label: string }) {
  const state = useCursorStore();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => state.setMouseState(MouseState.LINK)}
      onMouseLeave={() => state.resetMouseState()}
      className="hover:underline"
    >
      {label} <ArrowSquareOut size={14} className="inline" />
    </a>
  );
}
