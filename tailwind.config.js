/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'crypto-blue': '#1E40AF',
            'crypto-green': '#16A34A',
            'crypto-red': '#DC2626',
          },
        },
      },
      plugins: [],
    }
