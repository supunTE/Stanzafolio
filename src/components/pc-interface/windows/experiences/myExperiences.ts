import {
  otherTechnologies,
  skillIcons,
} from "../../../../assets/vectors/skills";

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
  socketio: {
    name: "Socket.IO",
    icon: skillIcons.socketio,
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
  threejs: {
    name: "Three.js",
    icon: skillIcons.threejs,
  },
  js: {
    name: "JavaScript",
    icon: skillIcons.js,
  },
  jekyll: {
    name: "Jekyll",
    icon: otherTechnologies.jekyll,
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

export type Project = {
  name: string;
  description: string;
  link: string;
  previewLink?: string;
  color: string;
  technologies?: Technology[];
  team?: boolean;
};

export const myProjects: Project[] = [
  {
    name: "Razor",
    description: "A free and open-source typing racing platform.",
    link: "https://github.com/the-ai-team/razor",
    color: "#F55C5C",
    technologies: [
      technologies.reactjs,
      technologies.nodejs,
      technologies.socketio,
      technologies.typescript,
    ],
  },
  {
    name: "Stanzafolio",
    description: "My personal portfolio website. (You're here!)",
    link: "https://github.com/supunTE/Stanzafolio",
    color: "#77FF9D",
    technologies: [
      technologies.reactjs,
      technologies.threejs,
      technologies.typescript,
    ],
  },
  {
    name: "Kala Pavura",
    description: "A social media platform for artists. (Under development)",
    link: "https://github.com/supunTE/kala-pavura",
    color: "#2DA1E4",
    technologies: [
      technologies.reactjs,
      technologies.nodejs,
      technologies.typescript,
      technologies.firebase,
    ],
  },
  {
    name: "Minecrafty",
    description: "A Minecraft-type mini terrain generator.",
    link: "https://github.com/supunTE/Minecrafty",
    color: "#48D13C",
    technologies: [technologies.reactjs, technologies.threejs],
  },
  {
    name: "IslandLink",
    description:
      "A mobile UI prototype for the digital nomad community visiting Sri Lanka, as part of a team project for a contest.",
    link: "https://github.com/supunTE/IslandLink",
    color: "#028090",
    technologies: [technologies.reactjs],
    team: true,
  },
  {
    name: "SL COVID-19 Report",
    description:
      "A simple web app to view real-time COVID-19 stats in Sri Lanka. Developed and maintained as a team.",
    link: "https://github.com/rivi-sl/SL-COVID19-REPORT",
    color: "#F55C5C",
    technologies: [technologies.js, technologies.jekyll],
    team: true,
  },
];

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
    title: "Organizer",
    project: "BITS",
    company: organizations.acicts,
    date: [{ year: 2019 }],
    description: "Continued involvement as an Organizer for BITS in 2019.",
  },
  {
    title: "Developer",
    project: "Battle of Maroons Live Score App",
    company: organizations.acicts,
    date: [{ year: 2020 }],
    description:
      "Developed the Battle of Maroons Live Score App, providing real-time score updates for Ananda College's cricket big match.",
    technologies: [technologies.angular, technologies.firebase],
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
