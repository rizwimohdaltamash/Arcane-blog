/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [function({ addUtilities }) {
    addUtilities({
      '.no-scrollbar': {
        '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
        'scrollbar-width': 'none',  /* Firefox */
        '&::-webkit-scrollbar': {
          display: 'none',  /* Safari and Chrome */
        },
      },
    }, ['responsive']);
  },],
}

