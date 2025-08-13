// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./index.html", // Also good to add this
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#f5f6f7',
        'custom-blue': '#2ec0e2',
      },
      boxShadow: {
        'custom-left': '-2px 0px 5px 2px rgba(52, 52, 52, 0.4)',
        'custom-right': '2px 0px 5px 2px rgba(52, 52, 52, 0.4)',
      },
    },
  },
  // The safelist is no longer needed for this use case in v3
  plugins: [],
}
