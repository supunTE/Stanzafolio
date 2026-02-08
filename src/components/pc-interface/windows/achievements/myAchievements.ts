import { achievementImages } from "../../../../assets/vectors/achievements";

export type Time = {
  year: number;
  month: number;
};

export type Achievement = {
  name: string;
  label: string;
  subLabel?: string;
  organizer?: string;
  url?: string;
  image?: string;
  month: Time;
  mini?: boolean;
  team?: boolean;
  lead?: boolean;
};

// key = [year, month]
export const myAchievements: Record<number, Achievement[]> = {
  201607: [
    {
      name: "Merit Award",
      label: "Young Computer Scientist Competition",
      subLabel: "National Level School ICT Competition",
      organizer: "Federation of Computer Science, Sri Lanka",
      url: "https://ycs.lk/",
      month: { year: 2016, month: 7 },
    },
  ],
  201707: [
    {
      name: "Merit Award",
      label: "Young Computer Scientist Competition",
      subLabel: "National Level School ICT Competition",
      organizer: "Federation of Computer Science, Sri Lanka",
      url: "https://ycs.lk/",
      month: { year: 2017, month: 7 },
    },
  ],
  201810: [
    {
      name: "1st Place",
      label: "ENVISAGE",
      subLabel: "Inter School Web Development Competition",
      organizer: "Musaeus College, Colombo",
      month: { year: 2018, month: 10 },
      mini: true,
    },
  ],
  201812: [
    {
      name: "Grand Prize Winner",
      label: "Google Code-in",
      subLabel: "Pre-University Level Open Source Coding Competition",
      organizer: "Google Inc.",
      url: "https://codein.withgoogle.com/archive/2018/",
      image: achievementImages.gci,
      month: { year: 2018, month: 12 },
    },
  ],
  201907: [
    {
      name: "Finalist",
      label: "National Olympiad in Informatics",
      organizer: "University of Colombo School of Computing",
      url: "https://www.noi.lk/",
      month: { year: 2019, month: 7 },
    },
  ],
  201908: [
    {
      name: "3rd Place",
      label: "National Schools Software Competition",
      subLabel: "National Level School ICT Competition",
      organizer: "Ministry of Education, Sri Lanka",
      month: { year: 2019, month: 8 },
    },
  ],
  201910: [
    {
      name: "1st Place",
      label: "CONEXION",
      subLabel: "Inter School Web Designing Competition",
      organizer: "Anula Vidyalaya, Nugegoda",
      month: { year: 2019, month: 10 },
      mini: true,
    },
  ],
  202002: [
    {
      name: "1st Place",
      label: "EXPLOIT",
      subLabel: "Inter School Web Designing Competition",
      organizer: "Wesley College, Colombo",
      month: { year: 2020, month: 2 },
      mini: true,
    },
  ],
  202008: [
    {
      name: "3rd Place",
      label: "INFIGO",
      subLabel: "Inter School ICT Quiz Competition",
      organizer: "Mahanama College, Colombo",
      month: { year: 2020, month: 8 },
      mini: true,
      team: true,
    },
    {
      name: "2nd Place",
      label: "ERA NOVUM",
      subLabel: "Inter School Infographics Competition",
      organizer: "Musaeus College, Colombo",
      month: { year: 2020, month: 8 },
      mini: true,
    },
  ],
  202010: [
    {
      name: "2nd Runner Up",
      label: "CODEFEST",
      subLabel: "Inter School ICT Quiz Competition",
      organizer: "Sri Lanka Institute of Information Technology",
      month: { year: 2020, month: 10 },
      mini: true,
      team: true,
    },
  ],
  202304: [
    {
      name: "2nd Place",
      label: "CodeSprint 7.0",
      subLabel: "DesignSprint Phase",
      organizer: "IEEE Student Branch, Informatics Institute of Technology",
      month: { year: 2023, month: 4 },
      url: "https://codesprint.lk/",
      team: true,
      lead: true,
    },
  ],
  202403: [
    {
      name: "4th Place",
      label: "REVOLUX 3.0",
      subLabel: "UI/UX Designathon",
      organizer:
        "IEEE Student Branch, University of Colombo School of Computing",
      month: { year: 2024, month: 3 },
      url: "https://www.linkedin.com/posts/supunte_revolux-uiux-designathon-activity-7172917198640861185-U8n0?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACVTxisBvgDqhIInsprc-ArCUGZhJecm7Y0",
      team: true,
      lead: true,
      mini: true,
    },
  ],
  202405: [
    {
      name: "3rd Place",
      label: "Parallax",
      subLabel: "UI/UX Hackathon",
      organizer: "Rotract Club of Informatics Institute of Technology",
      month: { year: 2024, month: 5 },
      url: "https://www.linkedin.com/posts/rotaract-club-of-iit_parallax-ui-ux-activity-7200092993268191232-8E30?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACVTxisBvgDqhIInsprc-ArCUGZhJecm7Y0",
    },
    {
      name: "Best Team",
      label: "iCIIT",
      subLabel: "NLP Shared Task Competition",
      organizer: "Informatics Institute of Technology",
      month: { year: 2024, month: 5 },
      url: "https://iciit.iit.ac.lk/",
      team: true,
    },
  ],
  202508: [
    {
      name: "Finalists",
      label: "CodeStorm AI",
      subLabel: "Buildathon",
      organizer: "Yarl IT Hub, YGC",
      month: { year: 2025, month: 8 },
      url: "https://www.linkedin.com/posts/supunte_codestormai2025-yarlithub-aieducation-activity-7367840337093947392-Ohvv?utm_source=share&utm_medium=member_android&rcm=ACoAACVTxisBvgDqhIInsprc-ArCUGZhJecm7Y0",
      team: true,
      lead: true,
    },
  ],
};
