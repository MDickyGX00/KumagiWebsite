/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'left': '-2px 0px 5px 1px rgba(0,0,0,0.49)',
        'all':'0px 0px 5px 1px rgba(0,0,0,0.49)',
      },
      container:{
        center:false,
        padding:'0',
      },
    },
  },
  plugins: [],
}