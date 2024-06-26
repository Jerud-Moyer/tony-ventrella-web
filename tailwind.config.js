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
      fontFamily: {
        go_bold: ["go-bold", 'sans-serif']
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
          '0%': {transform: 'translateY(400px)'},
          '100%': {transform: 'translateY(0px)'}
        },
        rise_later: {
          '0%': {transform: 'translateY(300px) translateX(100px) rotate(-12deg)'},
          '40%': {transform: 'translateY(300px)'},
          '100%': {transform: 'translateY(-155px) translateX(120px) rotate(-12deg)'}
        },
        pop: {
          '0%': {
            transform: 'scale(0)', 
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        gold_rush: {
          '0%': {
            color: '#111910',
            textShadow: '5px 5px 10px #d8ba5e',
            transform: 'scale(1.5)'
          },
          '25%': {
            textShadow: '5px 5px 10px #cba328'
          },
          '50%': {
            color: '#d8ba5e',
            textShadow: '5px 5px 10px #111910',
            transform: 'scale(1.5)'
          },
          '75%': {
            textShadow: '5px 5px 10px #cba328'
          },
          '100%': {
            color: '#111910',
            textShadow: '5px 5px 10px #d8ba5e',
            transform: 'scale(1)'
          }
        }       
      },
      animation: {
        fade: 'fade .8s ease',
        image_fade: 'fade 2s ease',
        rise: 'rise 1.2s ease',
        rise_later: 'rise_later 1.5s ease',
        pop: 'pop .5s ease',
        gold_rush: 'gold_rush 1.5s ease'
      }
    },
  },
  plugins: [],
}
