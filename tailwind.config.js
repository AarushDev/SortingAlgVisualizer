/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lighBackground: "#F0F0F0",
        primary: "#222",
        hoverPrimary: "#555",
        accent: "#FFB74D",
      },
    },
  },
  plugins: [],
};
