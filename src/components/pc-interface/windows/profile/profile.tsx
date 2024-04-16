import { Window } from "../window";

import { SocialSection } from "./SocialSection";

export function Profile(): JSX.Element {
  return (
    <Window id="profile">
      <div className="flex flex-col sm:flex-row h-full overflow-hidden">
        <div className="bg-white/80 w-full sm:h-full flex flex-col interface-scrollbar overflow-y-auto sm:w-2/5   lg:w-1/3 xl:w-1/5 p-4">
          <div className="relative">
            <img
              className="rounded-lg overflow-hidden bg-cover"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profile-img"
            />
            <div className="absolute bottom-0 border border-gray-400 shadow-sm bg-white p-1 rounded-md flex justify-between w-full">
              <span className="text-black text-sm text-center w-full">
                😉 Love to Learn!
              </span>
            </div>
          </div>
          <h1 className="text-black font-bold text-2xl py-4 text-center jetbrains-mono">
            Supun Tharinda Edirisuriya
            <div className="text-xs mt-2 text-gray-500">He/him</div>
          </h1>
          <h5 className="text-black text-center text-sm">
            <span className="hover:text-green-800 transition-colors duration-300">
              Developer
            </span>
            {` | `}
            <span className="hover:text-purple-800 transition-colors duration-300">
              Designer
            </span>
          </h5>
          <SocialSection />
        </div>
        {/* <img
          className="h-5 border-white"
          src={assets.sriLankanFlag}
          alt="profile-img"
        /> */}
      </div>
    </Window>
  );
}
