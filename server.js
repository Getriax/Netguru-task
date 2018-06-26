const express = require('express'),
      port    = process.env.PORT || require('./config').port,
      router  = require('./routes/router'),
      db      = require("./services/database"),
      app     = express();


class Server {

    constructor() {
        this.initRoutes();
        this.initDatabase();

        this.startServer();
    }
    initRoutes() {
        router.load(app, 'controllers');
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
    initDatabase() {
        db.open();
    }

}

const server = new Server();


