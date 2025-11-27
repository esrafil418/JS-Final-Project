//! for Search section
export function debounce(fn, wait = 2000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

// link:
// https://stackoverflow.com/questions/75988682/debounce-in-javascript
// https://www.freecodecamp.org/news/javascript-debounce-example/
