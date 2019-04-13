// A solution for React 16 complaining of missing rAF.
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
