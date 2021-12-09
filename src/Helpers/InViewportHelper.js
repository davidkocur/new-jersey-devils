let lastObservedID = 0;
let safeIDs = [];
const getNewID = () => {
  if (safeIDs.length > 0) return safeIDs.pop();
  lastObservedID++;
  return `observe${lastObservedID}`;
};
const observedElements = {};
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) observedElements[entry.target.id].callback();
    });
  },
  { root: null, threshold: 1 }
);

export const addObservedElement = (element, callback) => {
  observer.observe(element);
  const id = getNewID();
  element.id = id;
  observedElements[id] = { element, callback };
  return id;
};

export const removeObservedElement = (id) => {
  console.log(`ID ${id} is no longer observed!`);
  observer.unobserve(observedElements[id].element);
  observedElements[id] = undefined;
  safeIDs.push(id);
};
