/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#09678C',
        darkColor: '#323743',
        secondary: '#ecc94b',
        'grey-bg': '#F2F4F7',
        line: '#E4E7EC',
        'sidebar-body': '#f7f7f7',
        'card-gray': '#eeeeee',
        'card-gray-light': '#fafafa',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
