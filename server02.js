const http = require("http");

const HOST = "localhost";
const PORT = "10000";

const json_data = {
    "nama" : "Hidayatur Rahman",
    "nim" : 202410101057,
    "alamat" : "Bondowoso"
}

const requestListener = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(json_data));
}

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`BASE URL SERVER : http://${HOST}:${PORT}`);
})

