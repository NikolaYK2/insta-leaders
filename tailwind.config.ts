import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slot: {
          '0%': {transform: 'translateY(100%)'},
          '50%': {transform: 'translateY(-10%)'},
          '100%': {transform: 'translateY(0%)'},
        },
      },
      animation: {
        slot: 'slot 0.5s ease-in-out',
      },
      colors: {
        accent: {
          100: '#73A5FF',
          300: '#4C8DFF',
          500: '#397DF6',
          700: '#2F68CC',
          900: '#234E99',
        },
        success: {
          100: '#80FFBF',
          300: '#22E584',
          500: '#14CC70',
          700: '#0F9954',
          900: '#0A6638',
        },
        danger: {
          100: '#FF8099',
          300: '#F23D61',
          500: '#CC1439',
          700: '#990F2B',
          900: '#660A1D',
        },
        warning: {
          100: '#FFD073',
          300: '#E5AC39',
          500: '#D99000',
          700: '#996600',
          900: '#664400',
        },
        dark: {
          100: '#4C4C4C',
          300: '#333333',
          500: '#171717',
          700: '#0D0D0D',
          900: '#000000',
        },
        light: {
          100: '#FFFFFF',
          300: '#F7FBFF',
          500: '#EDF3FA',
          700: '#D5DAE0',
          900: '#8D9094',
        },
      },
      screens: {
        mobile: {max: '22.5rem'}, // 360px
        notePad: {max: '48rem'}, // 768px
        desktop: '80rem', // 1280px
      },
      width: {
        '330': '330px',
        '378': '378px',
      },
      visibility: {
        visible: 'visible',
        invisible: 'hidden',
      },
      opacity: {
        0: '0',
        100: '1',
      },
    },
  },
  plugins: [],
}
export default config
