/** @type {import('tailwindcss').Config} */
import {myConfig} from "./Preset.js";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [myConfig],
  plugins: [],
};
