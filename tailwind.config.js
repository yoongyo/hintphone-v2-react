const colors = require("tailwindcss/colors")

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#548CA8',
      'secondary': '#334257',
    }),
    borderColor: theme => ({
      ...theme('colors'),
       DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#548CA8',
      'secondary': '#334257',
     })
  },
  
  variants: {
    extend: {},
  },
  plugins: [],
}
