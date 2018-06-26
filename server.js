const express = require('express'),
      port    = require('./config').port,
      app     = express();


class Server {

    constructor() {

    }
    initRoutes() {

        app.use(express.static(__dirname + "/dist"));
        app.use('/*', (req, res) => {
            res.sendFile(__dirname + '/dist/index.html');
        });

    }
    startServer() {
        app.listen(port, (err) => {
            console.log('Listening on http://localhost:%d', port);
        });
    }


}





