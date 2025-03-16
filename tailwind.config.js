/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        LightModeBg: "hsl(0, 0%, 98%)",
        LightModeInput: "hsl(0, 0%, 52%)",
        DarkModeBg: "hsl(207, 26%, 17%)",
        DarkModeElements: "hsl(209, 23%, 22%)",
        DarkModeTxt_LightModeElements: "hsl(0, 0%, 100%)",
      },
      textColor: {
        LightModeText: "hsl(200, 15%, 8%)",
      },
    },
  },
  plugins: [],
};
