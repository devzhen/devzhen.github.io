export function debounce(fn, ms = 200) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    
    timer = setTimeout(() => { fn.apply(this, args); }, ms);
  };
}
