// Create enviroments (variables) to export
enviros = {};

enviros.staging = {
	'httpPort': 3000,
	'httpsPort' : 3001,
	'envName' : 'staging'
}

enviros.production = {
	'httpPort' : 5000,
	'httpsPort' : 5001,
	'envName' : 'production'
}

const currentEnviro = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
const enviroToExport = typeof(enviros[currentEnviro]) == 'object' ? enviros[currentEnviro] : enviros.staging;

module.exports = enviroToExport;