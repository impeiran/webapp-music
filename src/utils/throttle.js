export default (fn, interval) => {
  let pending = false
  
  return function (...args) {
    if (pending) return
    pending = true
    fn(...args)
    setTimeout(() => (pending = false), interval)
  }
}