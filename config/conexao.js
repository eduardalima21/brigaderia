const mongoose = require ('mongoose')
const url ="mongodb+srv://eduardarodriues:ritavirila@brigaderia.kisgfjd.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)

module.exports = mongoose;