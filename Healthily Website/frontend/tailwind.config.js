/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url(/landing.jpg)",
      },
      boxShadow: {
        custom: "0px 4px 25px -1px #EFEEFF",
      },
    },
  },
  plugins: [],
};
