/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
        antonio: ['Antonio', ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        'text-primary': 'rgb(var(--tw-text-primary) / <alpha-value>)',
        'bg-primary': 'rgb(var(--tw-bg-primary) / <alpha-value>)',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        tick: {
          '0%': {
            opacity: 0,
            transform: 'scale(4)',
          },
          '20%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-2em)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        slideOutRight: {
          '0%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(-2em)',
          },
        },
        fadeOut: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        circleZeroToScore: {
          '0%': {
            strokeDasharray: '0 100',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(8em)',
          },
          '10%': {
            transform: 'translateX(0)',
          },
          '80%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(8em)',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        gear: 'spin 4s linear infinite',
        tick: 'tick 5s linear forwards',
        slideInLeft: 'slideInLeft 0.5s ease-in normal forwards',
        slideOutRight: 'slideOutRight 0.5s ease-in normal forwards',
        fadeOut: 'fadeOut 1s ease-in-out forwards',
        fadeOutReversed: 'fadeOut 1s ease-in-out reverse forwards',
        circleZeroToScore: 'circleZeroToScore 1s ease-in-out',
        slideIn: 'slideIn 10s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
