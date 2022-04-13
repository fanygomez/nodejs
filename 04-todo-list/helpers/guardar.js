const fs = require('fs');

const file = './db/data.json';

const saveDB = ( data ) =>{

    fs.writeFileSync( file , JSON.stringify(data));
}

const readDB = () =>{
    if (!fs.existsSync(file)) {
        return null;
    }
    const data = fs.readFileSync(file,{ encoding: 'utf-8' });
    //console.log(data);
    return JSON.parse(data);
}
module.exports = {
    saveDB,
    readDB
}