/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    },
    colors: { 
      'primary-color': '#222260',
      'primary-color2': 'rgba(34, 34, 96, 0.6)',
      'primary-color3': 'rgba(34, 34, 96, 0.4)',
      'color-white': '#FFFFFF',
      'color-green': '#42AD00',
      'color-grey': '#aaa',
      'color-accent': '#F56692',
      'color-delete': '#FF0000',
      'color-app': '#ffecf2',
    },
    fontFamily: {
      'sans': ['Nunito', 'sans-serif'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light","synthwave","valentine"],
  },
}

