import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        finops: {
          950: '#0a0a0a',
          900: '#141414',
          800: '#1e1e1e',
        },
      },
    },
  },
  plugins: [],
}

export default config
