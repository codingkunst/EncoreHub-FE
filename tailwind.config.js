/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "rgb(138, 14, 196)",
        "main-color-opc": "rgba(138,14,196, .25)",
      },
      keyframes: {
        slider1: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-80%)",
          },
        },
        slider2: {
          "0%": {
            transform: "translateY(-80%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        slider3: {
          "0%": {
            transform: "translateY(20%)",
          },
          "100%": {
            transform: "translateY(-90%)",
          },
        },
      },
      animation: {
        slider1: "slider1 50s linear infinite",
        slider2: "slider2 50s linear infinite",
        slider3: "slider2 50s linear infinite",
      },
    },
  },
  plugins: [],
};
