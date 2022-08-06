const http = require("http");

const HOST = "localhost";
const PORT = "10000";

const requestListener = function(req, res) {
    res.writeHead(200);
    res.end("Ini backend Server nodeJS")
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`BASE URL SERVER : http://${HOST}:${PORT}`)
})