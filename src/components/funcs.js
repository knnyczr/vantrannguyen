
// SRC: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
export function debounce(fn, ms) {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
}