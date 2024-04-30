import { iconUrls } from "../store";

import { Profile } from "./profile/profile";
import { Skills } from "./skills/skills";
import { Achievements } from "./achievements";
import { Experiences } from "./experiences";

type windowKeys = keyof typeof iconUrls;

export const windows: Record<windowKeys, JSX.Element> = {
  profile: <Profile key="profile" />,
  achievements: <Achievements key="achievements" />,
  experiences: <Experiences key="experiences" />,
  skills: <Skills key="skills" />,
};
