import { desktopIcons } from "../../../assets/vectors/desktop";

type Icon = {
  src: string;
  alt: string;
  label: string;
  hide?: boolean;
};

export const iconUrls: Record<string, Icon> = {
  profile: {
    src: desktopIcons.user,
    alt: "profile",
    label: "Profile",
  },
  skills: {
    src: desktopIcons.wrench,
    alt: "wrench",
    label: "Skills",
  },
  achievements: {
    src: desktopIcons.trophy,
    alt: "trophy",
    label: "Achievements",
  },
  experiences: {
    src: desktopIcons.suitcase,
    alt: "suitcase",
    label: "Experiences",
  },
  shutdown: {
    src: desktopIcons.shutdown,
    alt: "shutdown",
    label: "Shutdown",
    hide: true,
  },
};
