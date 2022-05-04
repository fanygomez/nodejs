const mongoose = require('mongoose')

const dbConnection = async() =>{
    try {
        await mongoose.connect(
            process.env.MONGODB_CNN, 
            { 
                useNewUrlParser: true ,
                useUnifiedTopology:true,
                // useCreateIndex:true,
                // useFindAndModify:false
            });

            console.log(" BD online ...");

    } catch (error) {
        console.log("error =>",error);
        throw new Error('Error: Connect to DB...');
    }
}


module.exports = {
    dbConnection
};