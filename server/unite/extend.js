const debug = require('debug')
function objectExtend (objBefore) {
    var retObj = {}
    console.log('in extend arguemnts', arguments)
    for (var argu of objBefore) {
        console.log('in extend argu', argu)
        for (var key in argu) {
            if (typeof retObj[key] === 'undefined') {
                retObj[key] = argu[key]
            } else {
                debug('Ambiguity in objectExtent')
            }
        }
    }
    return retObj
}
module.exports = {
    objectExtend
}
