module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
    scale: {
      0: "0",
      25: ".25",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      99: ".99",
      100: "1",
      101: "1.01",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
      200: "2",
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      75: 75,
      100: 100,
      200: 200,
      auto: "auto",
    },
    extend: {
      grayscale: { 50: "50%", 75: "75%" },
      width: {
        250: "250px",
      },
      padding: {
        xl: "300px",
      },
      fontFamily: {
        "proxima-reg": ["Proxima", "Arial", "sans-serif"],
      },
      colors: {
        "dbeats-alt": "#061720",
        "dbeats-secondary-light": "#3EAEFF",
        "dbeats-dark": "#000",
        "dbeats-light": "#00d3ff",
        "dbeats-dark-primary": "#101010",
        "dbeats-dark-alt": "#1c1c1c",
        "dbeats-dark-secondary": "#181818",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-filters")],
};
