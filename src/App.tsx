import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";

import "./App.css";

function App() {
  useEffect(() => {
    const isProd = import.meta.env.PROD;
    if (isProd) return;

    // https://github.com/thedevdojo/tailwind-breakpoint-tool
    const n = "breakPoints",
      t = function () {
        document.getElementById(n) &&
          (document.getElementById(n).classList.add("-translate-y-full"),
          document.getElementById(n).classList.remove("mt-3"),
          setTimeout(function () {
            document.getElementById(n).remove();
          }, 500));
      };

    function onResize() {
      const s = window.innerWidth,
        d = document.createElement("div");
      if (
        ((d.id = n),
        (d.className =
          "fixed top-0 ease-out duration-300 flex -translate-y-full items-center w-auto px-2 py-1  text-xs text-gray-200 -translate-x-1/2 border rounded-full border-neutral-200/50 dark:border-neutral-700/70 shadow-3xl backdrop-blur-lg bg-white/80 dark:bg-neutral-900 left-1/2"),
        (d.style.zIndex = "9999"),
        !document.getElementById(n))
      ) {
        const a = `
                    <div class="px-1.5 py-px font-bold bg-blue-500 rounded-full">
                        <span class="inline-block sm:hidden">XS</span>
                        <span class="hidden sm:inline-block md:hidden">SM</span>
                        <span class="hidden md:inline-block 2md:hidden">MD</span>
                        <span class="hidden 2md:inline-block lg:hidden">2MD</span>
                        <span class="hidden lg:inline-block 2lg:hidden">LG</span>
                        <span class="hidden 2lg:inline-block xl:hidden">2LG</span>
                        <span class="hidden xl:inline-block 2xl:hidden">XL</span>
                        <span class="hidden 2xl:inline-block">2XL</span>
                    </div>
                    <span class="px-2 py-1 text-black dark:text-white"><span id="currentWidth">${s}</span>px</span>
                    <span id="resizerElementCloseButton" class="flex items-center justify-center w-5 h-5 text-gray-500 rounded-full cursor-pointer dark:text-neutral-300 bg-neutral-200/60 dark:bg-neutral-700/80 dark:hover:bg-neutral-700 hover:bg-neutral-200">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </span>
                `;
        (d.innerHTML = a),
          document.body.appendChild(d),
          setTimeout(function () {
            document
              .getElementById("resizerElementCloseButton")
              .addEventListener("click", function (e) {
                t();
              }),
              d.classList.remove("-translate-y-full"),
              d.classList.add("mt-3");
          }, 1);
      }
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Router />
    </BrowserRouter>
  );
}

export default App;
