/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f7f8f4',
          100: '#eef0e6',
          200: '#dde2cc',
          300: '#c4d0a8',
          400: '#a8b87e',
          500: '#8fa05c',
          600: '#6b7c3f',
          700: '#526032',
          800: '#424d29',
          900: '#384023',
          950: '#1d2112',
        },
      },
    },
  },
  plugins: [],
}
