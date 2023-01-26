/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#09678C',
        secondary: '#ecc94b',
        'grey-bg': '#F2F4F7',
        line: '#E4E7EC',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
