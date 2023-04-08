const mongoose = require('mongoose');


//Create Schema for Products
const productSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;