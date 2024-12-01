/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-gradient': 'linear-gradient(to top right, #f093fb, #f5576c)',
      },
      colors:{
        pink: '#f5576c'
      },
    },
  },
  plugins: [],
}

