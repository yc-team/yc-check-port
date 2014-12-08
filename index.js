'use strict';

var net = require('net');
module.exports = function (port, callbackFn) {
	//set default port
	port = port || '8080';
	//use net.createServer
	//see more in http://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener
	var server = net.createServer().listen(port);

	server.on('listening', function () {

		if (server) {
			//autom close 
			//http://nodejs.org/api/net.html#net_server_close_callback
			server.close();	
		}
		//set true
		callbackFn(true, port);
	});

	server.on('error', function (err) {
		var result = true;
		//EADDRINUSE 另一个请求已经运行在这个端口上
		if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
			result = false;
		}

		callbackFn(result, port);
	});

};
