import { iconUrls } from "../store";

import { Achievements } from "./achievements/achievements";
import { Profile } from "./profile/profile";
import { Skills } from "./skills/skills";
import { Experiences } from "./experiences/experiences";

type windowKeys = keyof typeof iconUrls;

export const windows: Record<windowKeys, JSX.Element> = {
  profile: <Profile key="profile" />,
  achievements: <Achievements key="achievements" />,
  experiences: <Experiences key="experiences" />,
  skills: <Skills key="skills" />,
};
