// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        "bg":"#b28f48",
        "brownColor":"#034428",
        "textBrown":"#034428",
        // 776151
        "Gold":"#C59E52",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
