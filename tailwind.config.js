module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#F2E1D9",
        secondary: "#BE856A",
        black: "#3F3B3B",
        cards: "#F9F3EE",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Roboto", "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
