const mongoose = require("mongoose")
const Category = require("./categoryModel")

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String, 
        required: true
    },
    itemDescription: {
        type: String, 
        // required: true
    },
    itemPrice: {
        type: String, 
        required: true
    },
    numberInStock: {
        type: Number, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
})

module.exports = mongoose.model("Item", ItemSchema)