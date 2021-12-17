import {Request, Response} from 'express';
//const fetch = require ( 'node-fetch' );
//let os = require('os');

let g_httpServer : any;
let g_io : any;

export function HttpInitialize ( portno:number )
{

    let express = require("express");
    let app = express();
    let bodyParser = require("body-parser");
    app.use ( bodyParser.json() );

    g_httpServer = require("http").Server(app);

    
    app.get('/',function(req:Request,res:Response){
        res.render('frontpage.ejs'/*,{
            topicHead : 'Student Form',
        }*/);
        console.log('user accessing Home page');
    });
    

    app.listen( portno,function(){
        console.log('server running on port 5000 mhmhm');
    })

        
    
    app.set("view engine", "ejs");
    app.set("views", "../client" );
    //app.set("views", "dist" );
    app.set("view options", { layout: false} );

// Pages    
    /*
    app.get('/', async function ( req: Request, res: Response ) {
        res.render ( 'homepage' );
    });

    app.get('/dashboard', async function ( req: Request, res: Response ) {
        res.render ( 'dashboard' );
    });
    
    app.get('/calibration', async function ( req: Request, res: Response ) {
        res.render ( 'calibration' );
    });
    
    app.get('/developer', async function ( req: Request, res: Response ) {
        res.render ( 'developer' );
    });
    */

    /*
    app.use ( express.static("dist"));

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
    */
}

/*
app.get('/',  HelloWorld )

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


async function HelloWorld (req:Request,res:Response) {
  res.status(200).send('Hellow guys');
}
*/