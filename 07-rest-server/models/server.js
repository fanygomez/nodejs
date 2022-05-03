const express = require('express')
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.users_routes = '/api/users';
        //md -> funcones que se ejecutaran siempre que ejecutemos nuestro server 
        this.middlewares();
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        this.app.use( express.static('public'));
    }
    
    routes(){
        this.app.use( this.users_routes , require('../routes/user'))
    }

    listener(){
        this.app.listen(this.port,()=>{
            console.log("SERVER: RUNNING.... PORT:", this.port);
        });
    }
}


module.exports = Server;
