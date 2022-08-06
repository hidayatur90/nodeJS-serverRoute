const mysql = require("mysql");
const url = require("url");
const http = require("http");

const HOST = "localhost"; 
const PORT = "10000";

const mydb = mysql.createConnection({
    host    : "localhost",
    user    : "root",
    password: "",
    database: "books"
});

mydb.connect(function(err){
    if (err) throw err;
    console.log("Success");
});

const requestListener = function(req, res) {
    const path_name = url.parse(req.url, true).pathname;

    switch (path_name) {
        case "/":
            res.writeHead(200);
            res.end("Backend data buku");
            break;
    
        case "/get_books":
            let query_get = "SELECT * FROM genre WHERE 1 = 1";
            const params_get = url.parse(req.url, true).query;

            if("genre" in params_get) {
                query_get += " AND genre = " + mysql.escape(params_get["genre"])
            };

            mydb.query(query_get, function(err, result){
                if(err) throw err;
                
                let response_data = {
                    "description" : "Berhasil ambil data",
                    "data" : result
                }

                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify(response_data));
            });
            break;

        case "/insert_books":
            let body_insert = [];
            req.on('data', (chunk) => {
                body_insert.push(chunk)
            }).on('end', () => {
                body_insert = JSON.parse(Buffer.concat(body_insert).toString());

                let genre = body_insert["genre"];
                let query_insert = "INSERT INTO genre(genre) VALUES(?)";
                let values_insert = [genre];
                
                mydb.query(query_insert, values_insert, function(err, result) {
                    if(err) throw err;
                    console.log(result);

                    let response_data = {
                        "description" : "Berhasil tambah data",
                        "data" : result
                    };

                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200);
                    res.end(JSON.stringify(response_data));
                });
            });
            break;
        
        case "/update_books":
            let body_update = [];
            req.on('data', (chunk) => {
                body_update.push(chunk);
            }).on('end', () => {
                body_update = JSON.parse(Buffer.concat(body_update).toString());

                let genre = body_update["genre"];
                let query_update = "UPDATE genre SET genre=? WHERE";

                if("genre" in body_update) {
                    query_update += " genre=" + mysql.escape(body_update["genre"]);
                }
                let values = [genre];

                mydb.query(query_update, values, function(err, result) {
                    if(err) throw err;

                    let response_data = {
                        "description" : "Berhasil update data",
                        "data" : result
                    };

                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200);
                    res.end(JSON.stringify(response_data));
                });
            });

            break;

        case "/delete_books":

            break;

        default:
            break;
    }
}

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`BASE URL SERVER : http://${HOST}:${PORT}`);
})