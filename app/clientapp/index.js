var express = require('express');

// Constants
var DEFAULT_PORT = 3000;
var PORT = process.env.PORT || DEFAULT_PORT;

// App
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World\n');
});

app.get('/api/profiles', function(req, res) {
    //    res.send('Hello World\n');
    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "localhost",
        "port": "4002",
        "path": "/api/profiles",
        "rejectUnauthorized": false,
        "requestCert": true,
        "agent": false,
        "headers": {
            "x-ibm-client-id": "default",
            "x-ibm-client-secret": "SECRET",
            "content-type": "application/json",
            "accept": "application/json"
        }
    };

    var reqapi = http.request(options, function(resapi) {
        var chunks = [];

        resapi.on("data", function(chunk) {
            chunks.push(chunk);
        });

        resapi.on("end", function() {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            res.send(body.toString());
        });
    });

    reqapi.end();
});


app.listen(PORT)
console.log('Running on http://localhost:' + PORT);