module.exports = {
  mode: 'jit',
  purge: [
    './src/components/*.vue',
    './src/views/*.vue',
    './src/App.vue'
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
