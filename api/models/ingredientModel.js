const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        amount: { 
            type: Number,
            required: true 
        }
    }) // obj schema 

    module.exports =  mongoose.model('Ingredient', ingredientSchema); /// se exporta como Tasks el objeto TareaSchema que es el formato que tendran las tareas en la bd
    