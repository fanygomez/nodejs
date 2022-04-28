require('dotenv').config();
const express = require('express');
const hbs = require('hbs')
const app = express();
const port = process.env.PORT;
//todo requiere('hbs')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname +'/views/partials');
// servir contenido estatico
app.use( express.static('public'))

app.get('/', (req, res) =>{
    res.render('home',{
        name:'fany',
        title:'Node'
    }); 
});

app.get("/hola-mundo", ( req, res) => {
    res.send("hello world");
});
app.get("/generic", ( req, res) => {
    // res.sendFile(__dirname + '/public/generic.html');
    res.render('generic',{
        title:'Generic',
        name:'Fany'
    });
});

app.get("/elements", ( req, res) => {
    // res.sendFile(__dirname + '/public/elements.html');
    res.render('elements',{
        title:'Elements',
        name:'Fany'
    });
});

app.get("*", ( req, res) => {
    res.sendFile(__dirname + "public/error/404.html");
});
app.listen(port,()=> {
    console.log(`Dev : listening at http://localhots:${port}`)
});