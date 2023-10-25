

const { connect } = require('mongoose');
const { config } = require('../config/config');
//'mongodb://127.0.0.1:27017/prueba'
const configConnection = {
    url : `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`,
    options : {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }
}

const mongoDBconnection = async () => {
    try {
        await connect(configConnection.url, configConnection.options);
        console.log('Estamos conectados!!');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    configConnection,
    mongoDBconnection
}