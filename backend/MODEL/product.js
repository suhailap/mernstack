const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    image:String

})

const PRODUCT = mongoose.model('Product', productSchema)

module.exports = PRODUCT


//Model is a part of db that we create to imitate the expected data 
//with model we cross check the incoming data before saving it in DB so that no unwanted data gets saved