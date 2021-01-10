/* eslint-disable */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'zero': '#283149',
        'one': '#404b69',
        'two': '#00818a',
        'three': '#dbedf3',
        'zero-light': '#fcf8ec',
        'one-light': '#d0e8f2',
        'two-light': '#79a3b1',
        'three-light': '#456268',
      }
    },
    // colors: {
    //   ...colors,
    //   test: colors.green
    // }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  // prefix: 'tw-',
}
