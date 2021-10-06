// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#F2E1D9",
      secondary: "#BE856A",
      black: "#3F3B3B",
      Cards: "#F9F3EE",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Roboto", "serif"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
