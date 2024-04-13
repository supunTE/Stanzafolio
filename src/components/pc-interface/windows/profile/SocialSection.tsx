import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";

export function SocialSection() {
  return (
    <div className="flex flex-col m-auto py-4 text-sm gap-1 text-black w-full">
      <a
        href="https://www.linkedin.com/in/supunte/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 hover:text-[#0077B5] p-1 hover:bg-white rounded-md transition-colors duration-300"
      >
        <LinkedinLogo size={16} /> LinkedIn
      </a>
      <a
        href="https://github.com/supunte/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 p-1 hover:text-white hover:bg-[#333] rounded-md transition-colors duration-300"
      >
        <GithubLogo size={16} /> GitHub
      </a>
      <a
        href="https://www.facebook.com/SupunTharindaE/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 p-1 hover:text-[#3b5998] hover:bg-white rounded-md transition-colors duration-300"
      >
        <FacebookLogo size={16} /> Facebook
      </a>
      <a
        href="https://www.instagram.com/supuntharinda_"
        target="_blank"
        rel="noreferrer"
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
      <a
        href="https://twitter.com/Supun_Tharinda_"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 p-1 hover:bg-[#14171A] hover:text-white rounded-md transition-colors duration-300"
      >
        <XLogo size={16} /> X <span className="text-xs">(Twitter)</span>
      </a>
      <div className="flex mt-4 gap-2 flex-wrap">
        Other:
        <a
          href="https://www.fiverr.com/supun_tharinda"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center px-2 gap-2 border border-gray-300 hover:bg-[#1DBF73] hover:text-white rounded-md transition-colors duration-300"
        >
          Fiverr
        </a>
        <a
          href="https://dribbble.com/supun_te"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center px-2 gap-2 border border-gray-300 hover:bg-[#ed4989] hover:text-white rounded-md transition-colors duration-300"
        >
          Dribble
        </a>
      </div>
    </div>
  );
}
