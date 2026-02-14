export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

export const flowDotAnimation = {
  animate: {
    left: ["0%", "100%"],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.1, 0.9, 1]
    }
  }
};