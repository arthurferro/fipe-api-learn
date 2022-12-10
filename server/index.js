const http = require('http');
const url = require('url');
var gis = require('g-i-s');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  if (queryObject.modelo) {
    gis(queryObject.modelo, function (error, results) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ results }));
      return;
    });

    return;
  }

  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end();
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
