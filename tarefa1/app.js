const http = require('http');

const server = http.createServer((req, res) => {
	const url = req.url;
	if (url === '/') {
		res.setHeader('Content-type', 'text/html');
		res.write('<html>');
		res.write('<head><title>Tarefa 1</title></head>');
		res.write('<body><p>Welcome to my page</p>');
		res.write(
			'<form action="/create-username" method="POST"><input type="text" name="username" placeholder="Digite seu username"></input><button type="submit">Send</button></form>'
		);
		res.write('</body>');
		res.write('</html>');
		return res.end();
	}
	if (url === '/users') {
		res.setHeader('Content-type', 'text/html');
		res.write('<html>');
		res.write('<head><title>Tarefa 1</title></head>');
		res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
		res.write('</html>');
		return res.end();
	}
	if (url === '/create-username') {
		const body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log(parsedBody);
		});
		res.statusCode = 302;
		res.setHeader('Location', '/');
		res.end();
	}
});
server.listen(3000);
