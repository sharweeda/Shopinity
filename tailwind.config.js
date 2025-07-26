/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", 
    "node_modules/flowbite/**/*.js", 
  ],
  theme: {
    extend: {
      container:{
        center: true,
        padding: '2rem',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

