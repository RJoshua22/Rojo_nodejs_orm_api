const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequalize } = require('sequalize');

module.exports = db = {};

initialize();

async function initialize() {
    //create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = awaitmysql.createConnection({host, port, user, password});
    await connection.query('CREATE DATABASE IF NOT EXISTS \'${database}\';');

    //connect to db
    const sequalize = new Sequalize(database, user, password, {dialect: 'mysql'});

    //init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);

    //sync all models with database
    await sequalize.sync({alter:true});
}