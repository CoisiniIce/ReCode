import { type Variants } from "motion";

export const sidebarVariants: Variants = {
  open: {
    width: "16rem",
    transition: { duration: 0.3, type: "spring", damping: 17 },
  },
  closed: {
    width: "5rem",
    transition: { duration: 0.3, type: "spring", damping: 17 },
  },
};

export const categoryVariants: Variants = {
  open: { opacity: 1, height: "auto", marginBottom: "1rem" },
  closed: { opacity: 0, height: 0, marginBottom: 0 },
};

export const textVariants: Variants = {
  open: {
    opacity: 1,
    width: "auto",
    x: 0,
    display: "block",
    transition: {
      opacity: { duration: 0.3, delay: 0.1 },
      width: { duration: 0.3 },
    },
  },
  closed: {
    opacity: 0,
    width: 0,
    x: -10,
    transitionEnd: { display: "none" },
    transition: {
      opacity: { duration: 0.1 },
      width: { duration: 0.3 },
    },
  },
};

export const arrowVariants: Variants = {
  open: {
    rotate: 0,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    rotate: 180,
    transition: {
      duration: 0.2,
    },
  },
};
