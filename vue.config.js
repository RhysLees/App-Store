module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				publish: [
					{
						private: true,
						provider: "github",
						owner: "NanoCellWebDesign",
						repo: "App-Store",
						publishAutoUpdate: true,
					},
				],
			},
		},
	},
};
