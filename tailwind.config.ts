import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark / text
        obsidian: '#1f2726',
        seaweed: '#284443',
        patina: '#4b7978',
        sage: '#79a3a1',
        // Borders / surfaces
        mist: '#a8cac8',
        dew: '#D2E4E4',
        frost: '#e8f2f2',
        haze: '#edf1f0',
        // Accent
        coral: '#ea3c5e',
        rose: '#f65776',
        peach: '#ffa49a',
        // Backgrounds
        sand: '#f6f1eb',
        ivory: '#faf8f0',
      },
      fontFamily: {
        display: ['"Momo Trust Display"', 'Georgia', 'serif'],
        sans: ['Lexend', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '20px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 2px 16px 0 rgba(31, 39, 38, 0.06)',
        modal: '0 8px 40px 0 rgba(31, 39, 38, 0.14)',
      },
      fontSize: {
        '2xs': ['10px', '14px'],
      },
    },
  },
  plugins: [],
}

export default config
