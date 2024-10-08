import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)']
      },
      colors: {
        "theme": 'rgb(94, 177, 177)',
        "theme-dark": 'rgb(88, 158, 158)'
      }
    },
  },
  plugins: [],
};
export default config;
