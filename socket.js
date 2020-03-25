const net = require('net');
const dns = require('dns');

const host = process.argv[2] || 'example.com';
const port = process.argv[3] || 80;

dns.lookup(host, (err, ipAddress) => {
  if (err) throw err

  console.log(ipAddress);
	
  const socket = net.createConnection({
    host: ipAddress,
    port
  });

  const request = `
GET / HTTP/1.1
Host: ${host}

`.slice(1);

  socket.pipe(process.stdout);
  socket.write(request, undefined, () => {
    socket.end();
  });

});

