"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const fetch = require ( 'node-fetch' );
//let os = require('os');
let g_httpServer;
let g_io;
function HttpInitialize(portno) {
    let express = require("express");
    let app = express();
    let bodyParser = require("body-parser");
    app.use(bodyParser.json());
    g_httpServer = require("http").Server(app);
    app.set("view engine", "ejs");
    app.set("views", "../client/dist");
    app.set("view options", { layout: false });
    app.get('/', function (req, res) {
        res.render('frontpage.ejs' /*,{
            topicHead : 'Student Form',
        }*/);
        console.log('user accessing Home page');
    });
    app.use(express.static("dist"));
    const io = require('socket.io')(g_httpServer);
    const port = portno;
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    });
    g_httpServer.listen(port, () => {
        console.log(`Socket.IO server running at http://localhost:${port}/`);
    });
}
exports.HttpInitialize = HttpInitialize;
/*

g_httpServer.listen ( portno, (err:any) => {
    if(err)
    {
        console.error(err);
    }
    
    g_io = require('socket.io').listen(g_httpServer, {
        log: false,
        agent: false,
        origins: '*:*',
        transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
    });

    g_io.on("connection", function(socket: any) {
        console.log("a user connected");

        socket.on("disconnect", function(message: any) {
            console.log("a user disconnected");
        });
    });
    
    console.info("Listening on *." + portno);
});
}
*/ 
