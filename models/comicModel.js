const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    discount: { 
        type: Number, 
        default: 0 
    },
    pages: { 
        type: Number, 
        required: true 
    },
    condition: { 
        type: String, 
        enum: ['new', 'used'], 
        required: true 
    },
    description: { 
        type: String 
    },
});

const Comic = mongoose.model('Comic', comicSchema)
module.exports = Comic;
