module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "active"],
      borderColor: ["focus-visible", "hover", "first"],
      borderStyle: ["hover"],
      borderWidth: ["hover"],
      textColor: ["visited"],
    },
  },
  plugins: [],
};
