/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        soft_white: '#f7f9f9',
        dark_green: '#44633f',
        sea_green: '#5a9367',
        mint: '#5cab7d',
        gold: '#cba328',
        old_gold: '#d8ba5e',
        eerie_black: '#111910'
      },
      keyframes: {
        fade: {
          '0%': {opacity: '0', transform: 'scale(.9)'},
          '%50': {opacity: '1'},
          '100%': {transform: 'scale(1)'}
        },
        rise: {
          '0%': {transform: 'translateY(300px)'},
          '100%': {transform: 'translateY(0px)'}
        },
        rise_later: {
          '0%': {transform: 'translateY(300px) translateX(100px) rotate(-12deg)'},
          '40%': {transform: 'translateY(300px)'},
          '100%': {transform: 'translateY(-155px) translateX(120px) rotate(-12deg)'}
        }
      },
      animation: {
        fade: 'fade .8s ease',
        image_fade: 'fade 2s ease',
        rise: 'rise 1s ease',
        rise_later: 'rise_later 1.5s ease'
      }
    },
  },
  plugins: [],
}
