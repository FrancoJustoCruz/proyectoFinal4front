/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBluefuerte: '#050C9C',
        customBluemedio: '#3572EF',
        customBlueligero: '#A7E6FF',
        customBlueBoton: '#3ABEF9',
      },
    },
  },
  plugins: [],
}