module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: 16,
      center: true,
    },
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
