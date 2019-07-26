const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    isChecked: {
        type: Boolean,
        default: false
    }
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item