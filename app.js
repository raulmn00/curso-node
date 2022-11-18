const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;
	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Enter The Message!</title></head>');
		res.write(
			'<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>'
		);
		return res.end();
	}

	if (url === '/message' && method === 'POST') {
		const reqBody = [];

		req.on('data', (chunk) => {
			console.log(chunk);
			reqBody.push(chunk);
		});
		return req.on('end', () => {
			const parsedBody = Buffer.concat(reqBody).toString();
			const message = parsedBody.split('=')[1];
			console.log(parsedBody);
			fs.writeFile('message.txt', message, (err) => {
				res.statusCode = 302;
				res.setHeader('Location', '/');
				return res.end();
			});
		});
	}
	res.setHeader('Content-type', 'text/html');
	res.write('<html>');
	res.write('<head><title>MY PAGE</title></head>');
	res.write('<body><h1>Hello World Node.js!</h1></body>');
	res.end();
});

server.listen(3000);
