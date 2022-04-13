// const http = require("http")

// http.createServer((req, res) =>{
//  res.end("hello world");   
// }).listen(3000)

const express = require("express")
const app = express()

app.get('/',(req,res) =>{
    
    res.end("Hello World!!")

})


app.listen(3000,()=>{
    console.log("Sever funcionando...");
})