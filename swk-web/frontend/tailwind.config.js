/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 'zen' という名前でフォントファミリーを登録
        zen: ['"Zen Maru Gothic"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
