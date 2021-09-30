// 2 traer monggose
const mongoose = require('mongoose');

// 1 crear funcion asyncrona
const dbConnection = async() => {

// 4 crear el try cathc
    try {
        
        // 6 llamar a mongoose con un await xq debe esperar. llamar a la con
        // desde el envirroment
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //useCreateIndex: true
            //useFindAndModify: false
        });

        console.log('BD online!');        

    } catch (error) {
        // 5 trow
        console.log(error);
        throw new Error('Error iniciando DB');
    }

}




// 3 exportar el modulo para llamar desde otro lado
module.exports = {
    dbConnection
}
