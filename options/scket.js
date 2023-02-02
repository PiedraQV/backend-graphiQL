const express = require('express');

const { Server: HttpServer } = require('http');
const app = express();

const { Server: IOServer } = require('socket.io');
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);


io.on('connection', async socket => {
	console.log('Conexión establecida');
	const dbProducts = await products.getAll();
	io.sockets.emit('products', dbProducts);
	const dbMessages = await messages.getAll();
	io.sockets.emit('messages', dbMessages);
	socket.on('product', async product => {
		products.save(product);
		const dbProducts = await products.getAll();
		io.sockets.emit('products', dbProducts);
	});
	socket.on('message', async message => {
		messages.save(message);
		const dbMessages = await messages.getAll();
		io.sockets.emit('messages', dbMessages);
	});
});