module.exports = {
	mode: false,
	purge: [
		"./src/components/*.vue",
		"./src/components/auth/*.vue",
		"./src/views/*.vue",
		"./src/App.vue",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
