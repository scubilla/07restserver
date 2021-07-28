require('dotenv').config();    // las ap de 3ros vas primero

const Server = require('./models/server');



// mudar al constructor de la clase server
// const express = require('express')
// const app = express()
 
//app.get('/', function (req, res) {
//  res.send('Hello World')
//});
 
//app.listen( process.env.PORT, () => {
//    console.log('escuchando', process.env.PORT );
//});

// ahora debemos INSTANCIAR Y LLAMAR nuestra clase
const server = new Server();

server.listen();
