const configs = require('../../config')
module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: configs.logic_mysql.host,
        port: configs.logic_mysql.port,
        user: configs.logic_mysql.user,
        password: configs.logic_mysql.pass,
        database: configs.logic_mysql.db,
        charset: configs.logic_mysql.char
    }
})
