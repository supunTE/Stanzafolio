import {
  otherTechnologies,
  skillIcons,
} from "../../../../assets/vectors/skills";

export type Project = {
  name: string;
  image: string;
  description: string;
  link: string;
};

export const myProjects: Project[] = [
  {
    name: "Razor",
    image: "https://via.placeholder.com/150",
    description: "Online multiplayer type racing game",
    link: "https://github.com/the-ai-team/razor",
  },
];

// https://github.com/supunTE/Stanzafolio
//https://github.com/supunTE/kala-pavura
// https://github.com/supunTE/Minecrafty
// https://github.com/supunTE/IslandLink
//https://github.com/supunTE/SL-COVID19-REPORT
// bom

export type Time = {
  month?: number;
  year: number;
};

export type Technology = {
  name: string;
  icon?: string;
};

type technologyKeys = keyof typeof skillIcons | keyof typeof otherTechnologies;
const technologies: Partial<Record<technologyKeys, Technology>> = {
  ionic: {
    name: "Ionic",
    icon: otherTechnologies.ionic,
  },
  angular: {
    name: "Angular",
    icon: otherTechnologies.angular,
  },
  firebase: {
    name: "Firebase",
    icon: skillIcons.firebase,
  },
  reactjs: {
    name: "React",
    icon: skillIcons.reactjs,
  },
  nodejs: {
    name: "NodeJS",
    icon: skillIcons.nodejs,
  },
  typescript: {
    name: "TypeScript",
    icon: skillIcons.typescript,
  },
  flutter: {
    name: "Flutter",
    icon: skillIcons.flutter,
  },
  python: {
    name: "Python",
    icon: skillIcons.python,
  },
  gcp: {
    name: "GCP",
    icon: otherTechnologies.gcp,
  },
};

type Organization = {
  name: string;
  url: string;
};
const organizations: Record<string, Organization> = {
  aiteam: {
    name: "The AI Team",
    url: "https://www.the-ai.team/",
  },
  acicts: {
    name: "Ananda College ICT Society",
    url: "https://acicts.lk/",
  },
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type Experience = {
  title: string;
  company: Organization;
  date: Time[];
  description: string;
  project?: string;
  technologies?: Technology[];
};

export const myExperiences: Experience[] = [
  {
    title: "UI Designer",
    project: "Battle of Maroons Live Score App",
    company: organizations.acicts,
    date: [{ year: 2018 }],
    description:
      "Designed the user interface for the Battle of Maroons Live Score App, delivering real-time cricket big match updates between Ananda College and Nalanda College.",
    technologies: [technologies.ionic, technologies.angular],
  },
  {
    title: "Organizer",
    project: "BITS",
    company: organizations.acicts,
    date: [{ year: 2018 }],
    description:
      "Contributed as an organizer to the successful execution of the inaugural annual Intra School IT competition, BITS.",
  },
  {
    title: "Developer",
    project: "Battle of Maroons Live Score App",
    company: organizations.acicts,
    date: [{ year: 2019 }],
    description:
      "Developed the Battle of Maroons Live Score App, providing real-time score updates for Ananda College's cricket big match.",
    technologies: [technologies.angular, technologies.firebase],
  },
  {
    title: "Organizer",
    project: "BITS",
    company: organizations.acicts,
    date: [{ year: 2019 }],
    description: "Continued involvement as an Organizer for BITS in 2019.",
  },
  {
    title: "Secretary",
    company: organizations.acicts,
    date: [
      { year: 2020, month: 7 },
      { year: 2021, month: 7 },
    ],
    description:
      "Served as Secretary of the Ananda College ICT Society from 2020 to 2021.",
  },
  {
    title: "Organizer",
    project: "ANALYTIQ",
    company: organizations.acicts,
    date: [{ year: 2020 }],
    description:
      "Participated as an organizer in the inter-school IT Quiz competition, ANALYTIQ.",
  },
  {
    title: "Software Engineer Intern",
    company: organizations.aiteam,
    date: [
      { year: 2021, month: 8 },
      { year: 2022, month: 8 },
    ],
    description:
      "Completed a Software Engineering Internship with The AI Team, gaining experience in various technologies.",
    technologies: [
      technologies.reactjs,
      technologies.nodejs,
      technologies.typescript,
      technologies.firebase,
      technologies.flutter,
      technologies.python,
      technologies.gcp,
    ],
  },
];
