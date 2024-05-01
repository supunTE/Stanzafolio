type Icon = {
  src: string;
  alt: string;
  label: string;
};

export const iconUrls: Record<string, Icon> = {
  profile: {
    src: "https://img.icons8.com/3d-fluency/94/user-male.png",
    alt: "profile",
    label: "Profile",
  },
  skills: {
    src: "https://img.icons8.com/3d-fluency/94/job.png",
    alt: "wrench",
    label: "Skills",
  },
  achievements: {
    src: "https://img.icons8.com/3d-fluency/94/trophy.png",
    alt: "trophy",
    label: "Achievements",
  },
  experiences: {
    src: "https://img.icons8.com/3d-fluency/94/suitcase.png",
    alt: "suitcase",
    label: "Experiences",
  },
} as const;
