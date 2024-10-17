// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        "bg":"#F7F3E8",
        "brownColor":"#776151"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
