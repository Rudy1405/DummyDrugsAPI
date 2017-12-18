const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({

        lotNumber: {type: Number, required: true }, // numero de lote de la entrega
        amount: {type: Number, required: true }, // cantidad de la droga a entregar
        from: { type: Schema.Types.ObjectId, ref:"User" }, /// Dealer
        to: { type: Schema.Types.ObjectId, ref:"User" }, /// Cheff
        description: { type: String },  /// descripcion dela entrega
        createdDate: { // fecha de creacion del pedido
            type: Date,
            default: Date.now,
            required: true
        },
        deliveryDate: {  /// fecha de entrega prevista
            type: Date,
            required: true
        },
        status: {  /// estado actual de la entrega
            type: [{ 
                type: String,
                enum: ['entregada', 'enviada', 'pendiente','cancelada']
            }],
            default: ['pendiente']  /// en caso de que no este en alun estado poner pendiente 
        }
        })

        /// pendiente: Funcion que valide que el cheff y el Dealer en FROM/TO no sean el mismo

module.exports = mongoose.model('Order', orderSchema)