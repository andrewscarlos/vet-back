
const multer = require('multer')
const path =  require('path')
const crypto = require('crypto')

module.exports = {
    storage : multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename(req, file, cb){
            const filehash = crypto.randomBytes(10).toString('hex')
            const fileName = `${filehash}-${file.originalname}` 
            return cb(null, fileName) 
        }
    })
}