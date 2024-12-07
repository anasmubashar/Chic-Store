/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        sage: {
          light: "#D1D9CF",
          dark: "#404E3E",
        },
      },

      backgroundColor: {
        "cart-bg": "#F5F6F4",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
