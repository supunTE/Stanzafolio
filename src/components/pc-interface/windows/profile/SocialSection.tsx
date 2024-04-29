import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import clsx from "clsx";

import { MouseState, useCursorStore } from "../../store";

export function SocialSection() {
  const cursorState = useCursorStore();

  return (
    <div className="flex flex-col m-auto py-4 text-sm text-black w-full">
      <SocialIcon
        href="https://www.linkedin.com/in/supunte/"
        icon={<LinkedinLogo size={16} />}
        color="#0077B5"
        label="LinkedIn"
        classNames="hover:text-[#0077B5] hover:bg-white"
      />
      <SocialIcon
        href="https://github.com/supunte/"
        icon={<GithubLogo size={16} />}
        color="#333"
        label="GitHub"
        classNames="hover:text-white hover:bg-[#333]"
      />
      <SocialIcon
        href="https://www.facebook.com/SupunTharindaE/"
        icon={<FacebookLogo size={16} />}
        color="#1877F2"
        label="Facebook"
        classNames="hover:text-[#1877F2] hover:bg-white"
      />

      <a
        href="https://www.instagram.com/supuntharinda_"
        target="_blank"
        rel="noreferrer"
        onMouseOver={() => {
          cursorState.setCursorColor("#bc2a8d");
          cursorState.setMouseState(MouseState.LINK);
        }}
        onMouseOut={() => {
          cursorState.resetCursorColor();
          cursorState.resetMouseState();
        }}
        className="flex group/icon items-center p-1 hover:bg-white rounded-md justify-center gap-2 transition-colors duration-300"
      >
        <InstagramLogo
          size={16}
          className="text-black group-hover/icon:text-[#405DE6] transition-colors duration-300"
        />{" "}
        <div className="relative">
          <span className="bg-gradient-to-r from-[#5B51D8] via-[#833AB4] to-[#FD1D1D] text-transparent bg-clip-text opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
            Instagram
          </span>
          <span className="text-black inset-0 absolute opacity-100 group-hover/icon:opacity-0 transition-opacity duration-300">
            Instagram
          </span>
        </div>
      </a>

      <SocialIcon
        href="https://twitter.com/Supun_Tharinda_"
        icon={<XLogo size={16} />}
        color="#14171A"
        label={
          <>
            X<span className="text-xs">(Twitter)</span>
          </>
        }
        classNames="hover:text-white hover:bg-[#14171A]"
      />

      <div className="m-auto mt-4 flex flex-col justify-center">
        <span className="text-gray-500 text-center py-1">More on:</span>
        <div className="flex gap-2 flex-wrap items-center justify-center">
          <MiniLink
            href="https://www.fiverr.com/supun_tharinda"
            color="#1DBF73"
            label="Fiverr"
            classNames="hover:bg-[#1DBF73]"
          />
          <MiniLink
            href="https://dribbble.com/supun_te"
            color="#ed4989"
            label="Dribble"
            classNames="hover:bg-[#ed4989]"
          />
          <MiniLink
            href="https://www.hackerrank.com/profile/STEdirisuriya"
            color="#2EC866"
            label="Hackerrank"
            classNames="hover:bg-[#2EC866]"
          />
        </div>
      </div>
    </div>
  );
}

const SocialIcon = ({ href, icon, color, label, classNames }) => {
  const cursorState = useCursorStore();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseOver={() => {
        cursorState.setCursorColor(color);
        cursorState.setMouseState(MouseState.LINK);
      }}
      onMouseOut={() => {
        cursorState.resetCursorColor();
        cursorState.resetMouseState();
      }}
      className={clsx(
        "flex items-center justify-center gap-2 p-1 rounded-md transition-colors duration-300",
        classNames
      )}
    >
      {icon} {label}
    </a>
  );
};

const MiniLink = ({ href, color, label, classNames }) => {
  const cursorState = useCursorStore();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseOver={() => {
        cursorState.setCursorColor(color);
        cursorState.setMouseState(MouseState.LINK);
      }}
      onMouseOut={() => {
        cursorState.resetCursorColor();
        cursorState.resetMouseState();
      }}
      className={clsx(
        "flex items-center justify-center px-2 border border-gray-300 rounded-md transition-colors duration-300 hover:text-white",
        classNames
      )}
    >
      {label}
    </a>
  );
};
