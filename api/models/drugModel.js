const mongoose = require('mongoose')
const Schema = mongoose.Schema


const drugSchema = new Schema({
        name: { type: String },
        ingredients: [{ type: Schema.Types.ObjectId, ref:"Ingredient" }], //id of ingredients that it could have
        description: {
            type: String,
            Required: true    
        },
        price: {
            type: Number,
            required: true
        }
        })


module.exports = mongoose.model('Drug', drugSchema)