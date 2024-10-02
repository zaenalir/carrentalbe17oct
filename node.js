const http = require("http");
const fs = require("fs");
const url = require('url');

function onRequest(req, res) {
    const data = fs.readFileSync("cars.json", "utf-8");
    const q = url.parse(req.url, true).query;
    const dataParse = JSON.parse(data);

    const search = q.name ? 
        dataParse.cars.filter((el) => el.name == q.name) : dataParse;

    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(JSON.stringify(search));
    res.end();
}

const server = http.createServer(onRequest);
server.listen(3000);