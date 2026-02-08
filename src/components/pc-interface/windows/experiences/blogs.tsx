import { ArrowSquareOut, Article } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { MouseState, useCursorStore } from "../../store";

import { expandVariants } from "./animationVariants";
import { Blog, months, myBlogs } from "./myExperiences";

type BlogsProps = {
  showBlogs: boolean;
};

export function Blogs({ showBlogs }: BlogsProps) {
  const titlebarStyles = "px-4 py-2 text-sm text-neutral-500 font-semibold";

  return (
    <motion.div
      layout
      className={clsx(
        "p-1 sm:p-4 bg-neutral-100 rounded-md my-4 mt-2 gap-y-2 text-neutral-800",
        "grid grid-cols-1",
        "xl:grid-cols-[1fr_200px]",
      )}
      animate={showBlogs ? "show" : "hide"}
      variants={expandVariants}
    >
      <div className={clsx(titlebarStyles, "hidden xl:block")}>Title</div>
      <div className={clsx(titlebarStyles, "hidden xl:block")}>Date</div>
      {myBlogs.map((blog, index) => (
        <BlogBar key={index} blog={blog} last={index === myBlogs.length - 1} />
      ))}
    </motion.div>
  );
}

function BlogBar({ blog, last }: { blog: Blog; last?: boolean }) {
  const commonStyles = clsx("p-4", { "border-b border-neutral-400/30": !last });
  const state = useCursorStore();

  return (
    <>
      <div className={clsx(commonStyles, "font-semibold flex flex-col")}>
        <div className="flex items-center gap-2 text-black">
          <Article size={20} weight="fill" className="w-6 h-6" />
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => state.setMouseState(MouseState.LINK)}
            onMouseLeave={() => state.resetMouseState()}
            className="hover:underline"
          >
            {blog.title} <ArrowSquareOut size={14} className="inline" />
          </a>
        </div>
        <div className="block xl:hidden text-sm font-normal ml-7 text-neutral-400">
          <DateCell date={blog.date} />
        </div>
      </div>

      <div
        className={clsx("p-4 text-neutral-600 text-sm", {
          "border-b border-neutral-400/30": !last,
          "hidden xl:inline": true,
        })}
      >
        <DateCell date={blog.date} />
      </div>
    </>
  );
}

function DateCell({ date }: { date: Blog["date"] }) {
  if (date.present) return <span>Present</span>;
  return (
    <span>
      {date.month != null ? months[date.month].slice(0, 3) : ""} {date.year}
    </span>
  );
}
