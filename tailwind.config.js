/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        DarkMode: {
          element: "hsl(209, 23%, 22%)",
          bg: "hsl(207, 26%, 17%)",
          text: "white",
        },
        LightMode: {
          text: "hsl(200, 15%, 8%)",
          input: "hsl(0, 0%, 52%)",
          bg: "hsl(0, 0%, 98%)",
          element: "white",
        },
      },
    },
  },
  plugins: [],
};
