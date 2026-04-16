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
        cream: "#F0FFF4",
        forest: "#2D8A4E",
        "forest-light": "#48BB78",
        "forest-dark": "#1E6B3A",
        bark: "#E8913A",
        "bark-dark": "#D07B2A",
        sky: "#87CEEB",
        charcoal: "#1A3A2A",
        muted: "#4A7C5C",
        accent: "#68D391",
        // Aliases for backward compat
        water: "#2D8A4E",
        "water-light": "#48BB78",
        sunset: "#E8913A",
        "sunset-dark": "#D07B2A",
        ocean: "#2D8A4E",
        "ocean-light": "#48BB78",
        coral: "#E8913A",
        "coral-dark": "#D07B2A",
      },
    },
  },
  plugins: [],
};
export default config;
