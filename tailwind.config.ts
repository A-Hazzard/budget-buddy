import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-primary": "#66E38A",
        "blue-secondary": "#003561",
        "dark": "#1f2426",
      },
      fontFamily: {
        "main": [ "Anek Kannada", "sans-serif"],
        "primary": ["Poetsen One", "sans-serif"],
        "secondary": ["Freeman", "sans-serif"]
      },
    },
  },
  plugins: [],
};
export default config;
