const htttp = require('http');

htttp.createServer((req, res) =>{
    res.writeHead(200, { 'Content-type':'application/json'});
    
    const persona = {
        id: 1,
        nombre: 'Stefhani'
    };
    res.write( JSON.stringify( persona) );
    res.end();
}).listen(9000);