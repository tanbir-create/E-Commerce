const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    images: [ 
        {img: {
            type: String }
        }
    ],

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});





const product = mongoose.model('Product', productSchema);

module.exports = product;