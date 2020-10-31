const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  http.get('http://skateipsum.com/get/3/1/JSON', (resp) => {
    let data = [];

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
          http.get('http://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new', (randresp) => {
          let randomdata = [];

          // A chunk of data has been recieved.
          randresp.on('data', (chunk) => {
            randomdata += chunk;
          });

          // The whole response has been received. Print out the result.
          randresp.on('end', () => {
            res.setHeader('Content-Type', 'text/plain');
            res.end(randomdata.toString());  
          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
     });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
