import clsx from "clsx";
import { motion } from "framer-motion";

import { assets } from "../../../../../assets";
import { MouseState, useCursorStore } from "../../../store";

export function AboutBox(): JSX.Element {
  const h6Style = "text-sm font-semibold text-gray-300 text-center";
  const pStyle = "text-sm text-gray-500 text-center -mt-2";
  const aStyle =
    "text-blue-200 hover:text-blue-100 transition-colors underline duration-300";

  const cursorState = useCursorStore();

  return (
    <div className="h-full bg-black relative text-white">
      <div
        className="grain absolute -inset-44 width-[200%] height-[200%] opacity-70"
        style={{ background: `url(${assets.noise})` }}
      ></div>
      <motion.div
        className="flex flex-col p-8 gap-3 items-center z-10"
        initial={{ translateY: "40%" }}
        animate={{ translateY: "-100%" }}
        transition={{ duration: 32, repeat: Infinity, repeatDelay: 2 }}
      >
        <h4 className="text-lg mt-2 font-bold jetbrains-mono">About</h4>
        <h6 className={h6Style}>Basic Icons</h6>
        <p className={pStyle}>
          <a
            href="https://phosphoricons.com/"
            className={aStyle}
            onMouseEnter={() => {
              cursorState.setMouseState(MouseState.LINK);
            }}
            onMouseLeave={() => {
              cursorState.resetMouseState();
            }}
          >
            Phosphor Icons
          </a>
          <br />
          (It's free & Open Source)
        </p>

        <h6 className={h6Style}>Coloured Icons</h6>
        <p className={pStyle}>
          <a
            target="_blank"
            href="https://icons8.com"
            className={aStyle}
            onMouseEnter={() => {
              cursorState.setMouseState(MouseState.LINK);
            }}
            onMouseLeave={() => {
              cursorState.resetMouseState();
            }}
          >
            Icons8
          </a>
        </p>

        <h6 className={h6Style}>PC Background</h6>
        <p className={pStyle}>
          Photo by Photo by{" "}
          <a
            className={aStyle}
            href="https://unsplash.com/@vackground?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            onMouseEnter={() => {
              cursorState.setMouseState(MouseState.LINK);
            }}
            onMouseLeave={() => {
              cursorState.resetMouseState();
            }}
          >
            vackground.com
          </a>{" "}
          on{" "}
          <a
            className={aStyle}
            href="https://unsplash.com/photos/a-green-and-yellow-background-with-wavy-lines-_CHTcNpKU1I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            onMouseEnter={() => {
              cursorState.setMouseState(MouseState.LINK);
            }}
            onMouseLeave={() => {
              cursorState.resetMouseState();
            }}
          >
            Unsplash
          </a>
        </p>

        <h6 className={h6Style}>Flappy Game Assets</h6>
        <p className={pStyle}>
          <a
            href="https://megacrash.itch.io/flappy-bird-assets"
            className={aStyle}
            onMouseEnter={() => {
              cursorState.setMouseState(MouseState.LINK);
            }}
            onMouseLeave={() => {
              cursorState.resetMouseState();
            }}
          >
            itch.io
          </a>
        </p>

        <h6 className={h6Style}>Fonts</h6>
        <p className={pStyle}>Google Fonts</p>

        <h6 className={h6Style}>3D Room Models</h6>
        <p className={pStyle}>This credit goes to me ;)</p>

        <h6 className={h6Style}>3D Room</h6>
        <p className={pStyle}>Made with Three.js</p>

        <h6 className={h6Style}>OS Interface</h6>
        <p className={pStyle}>
          Developed with ReactJs + several other libraries
        </p>

        <h6 className={h6Style}>Special Thanks</h6>
        <p className={pStyle}>
          ChatGPT <br />{" "}
          <span className="text-xs">
            (whose assistance was invaluable during challenging moments)
          </span>
        </p>

        <h6 className={clsx(h6Style, "noto-sans-sinhala")}>෴</h6>
      </motion.div>
    </div>
  );
}

// like credits
