const mysql = require('./mysql')
// const debug = require('debug')('dbmodule > postinfo')
const extend = require('../../unite/extend')
function insertinfo (options) {
    return mysql('infos').insert(extend.objectExtend(arguments))
}
function searchinfo (options) {
    if (options.id === 0) {
        return mysql.select('*').from('infos').limit(8).orderBy('id', 'desc')
    } else {
        return mysql.select('*').from('infos').where('id', '<', options.id).limit(8).orderBy('id', 'desc')
    }
}
module.exports = {
    insertinfo,
    searchinfo
}
