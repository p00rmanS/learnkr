/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        korean: {
          50: '#f9f5f0',
          100: '#f3ebe2',
          500: '#d4a574',
          600: '#c9935f',
          700: '#8b6f47',
        }
      },
      fontFamily: {
        korean: ['Noto Sans KR', 'Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
