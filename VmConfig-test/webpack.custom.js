module.exports = (config) => {
	config.experiments = config.experiments || {};
	config.experiments.topLevelAwait = true;
	return config;
};