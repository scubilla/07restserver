const express = require('express');


class Server {

    // declarar las propiedadesd en el constructor
    constructor() {
        this.app = express();   // app de express como propiedad
        // hacer visible el puerto
        this.port = process.env.PORT;  // para no usar env.port 

        // aqui van los middlewares
        this.middlewares();

        // aqui van las rutas de la aplicacion


        this.routes();  // 2 luego se llama el metodo

    }

    // 1 creamos un metodo para manejar las rutas
    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World');
        });
    }

    // metodo para escuchar    
    listen() {
        this.app.listen( this.port, () => {
            console.log('escuchando', this.port);
        });
      } 
    
    middlewares() {
        // crear caarpeta publica y llamarla
        this.app.use(express.static('public') );

    }


    }

    


module.exports = Server;
