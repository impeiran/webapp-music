export default function debounce (fn, delay) {
  // eslint-disable-next-line no-unused-vars
  let timer

  return function (...args) {

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}