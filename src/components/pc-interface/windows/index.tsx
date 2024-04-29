import { iconUrls } from "../store";

import { Profile } from "./profile/profile";
import { Achievements } from "./achievements";
import { Experiences } from "./experiences";
import { Skills } from "./skills";

type windowKeys = keyof typeof iconUrls;

export const windows: Record<windowKeys, JSX.Element> = {
  profile: <Profile key="profile" />,
  achievements: <Achievements key="achievements" />,
  experiences: <Experiences key="experiences" />,
  skills: <Skills key="skills" />,
};
