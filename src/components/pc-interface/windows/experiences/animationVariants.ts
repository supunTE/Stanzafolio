export const expandVariants = {
  show: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    // after animation end remove overflow: "hidden"
    transitionEnd: { overflow: "visible" },
    transition: { duration: 0.3 },
  },
  hide: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.3 },
  },
};
