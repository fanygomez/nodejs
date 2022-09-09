const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')( this.server );
        this.paths = {
            // auth:       '/api/auth',
        };
        this.middlewares();
        this.routes();
        this.sockets();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        //Public directory
        this.app.use( express.static('public'));
    }
    
    routes(){
        // this.app.use( this.paths.auth, require('../routes/auth'))
    }
    sockets(){
        this.io.on('connection', socketController)
    }
    listener(){
        this.server.listen(this.port,()=>{
            console.log("Listening in =>", this.port);
        });
    }
}


module.exports = Server;
