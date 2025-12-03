// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- CHANGED FROM 'tailwindcss'
    autoprefixer: {},
  },
}