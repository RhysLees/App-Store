module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				publish: [
					{
						private: false,
						provider: "github",
						owner: "NanoCellWebDesign",
						repo: "App-Store",
						publishAutoUpdate: true,
					},
				],
			},
		},
	},
	configureWebpack: {
		plugins: [
			require('tailwindcss'),
			require('autoprefixer'),
		],
	},
};
