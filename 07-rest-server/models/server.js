const express = require('express')

const cors = require('cors');
const { dbConnection } = require('../database/config');
const { validFields } = require('../middlewares/valid-fields');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.users_routes = '/api/users';
        // connect DB
        this.connectDB();
        //md -> funcones que se ejecutaran siempre que ejecutemos nuestro server 
        this.middlewares();
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        //Public directory
        this.app.use( express.static('public'));
        //body parser
        this.app.use(express.json());
        //
        this.app.use(validFields);
    }
    
    routes(){
        this.app.use( this.users_routes , require('../routes/user'))
    }

    listener(){
        this.app.listen(this.port,()=>{
            console.log("Listening in =>", this.port);
        });
    }

    async connectDB(){
        await dbConnection();
    }
}


module.exports = Server;
