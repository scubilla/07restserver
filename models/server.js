const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    // declarar las propiedadesd en el constructor
    constructor() {
        this.app = express();   // app de express como propiedad
        // hacer visible el puerto
        this.port = process.env.PORT;  // para no usar env.port 
        // crear string para optmizar coodigo 
        this.usuariosPath = '/api/usuarios';

        // viene de seccion 9
        // conectar base de datos
        this.conectarDB();


        // aqui van los middlewares
        this.middlewares();

        // aqui van las rutas de la aplicacion


        this.routes();  // 2 luego se llama el metodo

    }

    // crear metodo asincrono para conetaar db
    async conectarDB() {
        await dbConnection();
    }


    // 1 creamos un metodo para manejar las rutas
    // y manejar luego nuestros endpoints
    routes() {


        /* // get    
        this.app.get('/api', (req, res) => {
           // res.send('Hello World');
           res.json({
               msg:'get API'
           });
        });

        // put  
        this.app.put('/api', (req, res) => {
            // res.send('Hello World');
            res.status(400).json({
                msg:'put API'
            });
         });

         // post    
        this.app.post('/api', (req, res) => {
            // res.send('Hello World');
            res.status(201).json({
                msg:'post API'
            });
         });

         // delete    
        this.app.delete('/api', (req, res) => {
            // res.send('Hello World');
            res.json({
                msg:'delete API'
            });
         }); */

         this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    // metodo para escuchar    
    listen() {
        this.app.listen( this.port, () => {
            console.log('escuchando', this.port);
        });
      } 
    
    middlewares() {
        // se debe crear caarpeta publica y servirla con USE =  middlewares
        //  que son funciones q siempre se ejecurtan al levantar el server
        this.app.use(express.static('public') );

        // cors
        this.app.use( cors() );

        // configurar para recibir un post en formato JSON
        // lectura y parseo del body, la info serializa a json
        this.app.use( express.json() );


    }


    }

    


module.exports = Server;
