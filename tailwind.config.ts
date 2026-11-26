import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#15181D", steel: "#2B313A", signal: "#F5A300", paper: "#F3F4F1" } } },
  plugins: [],
};
export default config;
