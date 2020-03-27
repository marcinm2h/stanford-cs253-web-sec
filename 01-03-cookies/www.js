const net = require('net');

const HOST = '0.0.0.0';
const PORT = 8080;

const server = net.createServer((conn) => {
  console.log('client connected');

  conn.on('end', () => {
    console.log('client disconnected');
  });

  conn.on('data', data => {
    const str = data.toString('utf-8');
    console.log('data', str);
    conn.write('recieved');
  })
});

server.listen(PORT, HOST, () => {
  console.log(`Server listens on port ${PORT}`);
});
