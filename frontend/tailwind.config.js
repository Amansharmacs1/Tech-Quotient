/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F26422',
          light: '#FF8C42',
        },
        secondary: '#333333',
        background: '#F8F9FA',
        card: '#FFFFFF',
        accent: '#FFF1E8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
