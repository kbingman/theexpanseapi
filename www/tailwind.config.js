// import colors from 'tailwindcss/colors';

module.exports = {
  purge: ['./pages/**/*.tsx', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['focus-within'],
    },
  },
  plugins: [],
};
