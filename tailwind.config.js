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
      },
      textColor: {
        LightModeText: "hsl(200, 15%, 8%)",
      },
      animation: {
        "slide-in": "slideIn 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
