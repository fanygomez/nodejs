const express = require('express')

const cors = require('cors');
const { dbConnection } = require('../database/config');
const { validFields } = require('../middlewares/valid-fields');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            users:      '/api/users',
            categories: '/api/categories',
            products:   '/api/products',
            uploads: '/api/uploads'
        };
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
        this.app.use( this.paths.auth, require('../routes/auth'))
        this.app.use( this.paths.users , require('../routes/user'))
        this.app.use( this.paths.categories , require('../routes/category'))
        this.app.use( this.paths.products , require('../routes/product'))
        this.app.use( this.paths.uploads , require('../routes/uploads'));
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
