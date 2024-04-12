import { iconUrls } from "../store";

import { Achievements } from "./achievements";
import { Experiences } from "./experiences";
import { Profile } from "./profile";
import { Skills } from "./skills";

type windowKeys = keyof typeof iconUrls;

export const windows: Record<windowKeys, JSX.Element> = {
  profile: <Profile />,
  achievements: <Achievements />,
  experiences: <Experiences />,
  skills: <Skills />,
};
