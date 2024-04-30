import { skillIcons } from "../../../../assets/vectors/skills";

export type Skill = {
  name: string;
  icon: string;
};

export const mySkills: Skill[] = [
  { name: "HTML", icon: skillIcons.html },
  { name: "CSS", icon: skillIcons.css },
  { name: "Javascript", icon: skillIcons.js },
  { name: "SASS", icon: skillIcons.sass },
  { name: "ReactJS", icon: skillIcons.reactjs },
  { name: "ThreeJS", icon: skillIcons.threejs },
  { name: "Firebase", icon: skillIcons.firebase },
  { name: "NodeJS", icon: skillIcons.nodejs },
  { name: "Python", icon: skillIcons.python },
  { name: "TailwindCSS", icon: skillIcons.tailwindcss },
  { name: "Blender3D", icon: skillIcons.blender3d },
  { name: "Socket.IO", icon: skillIcons.socketio },
  { name: "TypeScript", icon: skillIcons.typescript },
  { name: "NextJS", icon: skillIcons.nextjs },
  { name: "ExpressJS", icon: skillIcons.expressjs },
  { name: "Jest", icon: skillIcons.jest },
  { name: "Redux", icon: skillIcons.redux },
  { name: "Git", icon: skillIcons.git },
  { name: "GitHub", icon: skillIcons.github },
  { name: "Flutter", icon: skillIcons.flutter },
  { name: "Figma", icon: skillIcons.figma },
  { name: "Postman", icon: skillIcons.postman },
];
