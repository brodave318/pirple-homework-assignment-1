// Homework Assignment #1 | Hello World API

// Dependencies
const http = require('http'),
      https = require('https'),
      url = require('url'),
      StringDecoder = require('string_decoder').StringDecoder;
      fs = require('fs'),
      config = require('./config.js');

// Establish connection
const httpServer = http.createServer(function(req, res) {
	uniServer(req, res);
});
httpServer.listen(config.httpPort, function() {
  console.log('Server listening on port ' + config.httpPort);
});

const httpsServerOps = {
	'key' : fs.readFileSync('./https/key.pem'),
	'cert' : fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOps, function(req, res) {
	uniServer(req, res);
});
httpsServer.listen(config.httpsPort, function() {
  console.log('Server listening on port ' + config.httpsPort);
});

// Logic for servers all in one place
const uniServer = function(req, res) {
	const parsedURL = url.parse(req.url, true),
	      path = parsedURL.pathname,
	      trimmedPath = path.replace(/^\/+|\/+$/g, ''),
	      queryStringObj = parsedURL.query,
	      method = req.method.toLowerCase(),
	      headers = req.headers,
	      decoder = new StringDecoder('utf-8');
	let buffer = '';

	req.on('data', function(data) {
		buffer += decoder.write(data);
	});
	req.on('end', function() {
		buffer += decoder.end();
		const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound,
		      data = {
		      	'trimmedPath' : trimmedPath,
		      	'queryStringObj' : queryStringObj,
		      	'method' : method,		      	
		      	'payload' : buffer
		      };
	
	chosenHandler(data, function(stausCode, payload) {
		const payloadStringified = JSON.stringify(payload);

		statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
		payload = typeof(payload) == 'object' ? payload : {};		
		res.setHeader('Content-Type', 'application/json');
		res.writeHead(statusCode);
		res.end(payloadStringified);
		console.log('Returned response: ', statusCode, payloadStringified);
		});
	});
}

// Routing
const handlers = {}
handlers.hello = function(data, callback) {
	callback(406, {'WELCOME!' : 'Enjoy my lovely API!'});
};
handlers.notFound = function(data, callback) {
	callback(404);
}
const router = {
	'hello' : handlers.hello
}