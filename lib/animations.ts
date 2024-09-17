export const slideFromLeftVariants = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.5 } },
  };
  
  export const slideFromRightVariants = {
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.5 } },
  };
  
  export const slideUpVariants = {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  
export const fadeInVariants = {
  initial: { opacity: 0, y: 2, scale: 1 }, // Start invisible, slightly moved, and smaller
  animate: {
    opacity: 1,
    y: 0,
    scale: [1,1.1, 1], // Scale up beyond the original size and then back to normal
    transition: {
      duration: 0.75, /// Duration for the whole animation
      scale: {
        duration: 0.75, // The scaling effect duration
      },
      opacity: {
        duration: 0.45, // The opacity effect duration
      }
    },
  },
};

  export const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2, // Adjust this value to control the delay between animations
    },
  },
};