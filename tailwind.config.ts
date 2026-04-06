import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FEFDF5",
        forest: "#2D6A4F",
        "forest-light": "#40916C",
        bark: "#E8913A",
        "bark-dark": "#D07B2A",
        sky: "#87CEEB",
        charcoal: "#2B2B2B",
        // Aliases for backward compat
        water: "#2D6A4F",
        "water-light": "#40916C",
        sunset: "#E8913A",
        "sunset-dark": "#D07B2A",
        ocean: "#2D6A4F",
        "ocean-light": "#40916C",
        coral: "#E8913A",
        "coral-dark": "#D07B2A",
      },
    },
  },
  plugins: [],
};
export default config;
