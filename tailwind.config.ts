import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        modviaBlack: '#111111',
        modviaIvory: '#FAF7F0',
        modviaGold: '#C8A45D',
        modviaGrey: '#7A7A7A'
      },
      boxShadow: {
        card: '0 10px 24px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
