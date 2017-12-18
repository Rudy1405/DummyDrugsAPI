const mongoose = require('mongoose')
const User = require('../models/userModel')
const Drug = require('../models/drugModel')
const Ingredient = require('../models/ingredientModel')
const Order = require('../models/orderModel')
const sendJSONresponse = require('./shared').sendJSONresponse

async function readStuff(req,res,next) { /// lets find something for someone
    try {

        let usuRole = req.user.role  /// first lets try to figure it out who is

        if(usuRole === 'Cheff'){ // if is a Cheff now lets try to find what he wants

            let stuff = await Drug.findById(req.params.stuffId) // may a drug
            if(stuff) // if exists as a drug
            {
                sendJSONresponse(res, 200, { drug: stuff })
            }else{
                stuff = await Ingredient.findById(req.params.stuffId) // may a ingredient
                if(stuff) // if exists as an ingredient
                {
                    sendJSONresponse(res, 200, { ingredient: stuff })
                }else{
                    stuff = await Order.findById(req.params.stuffId) // may a Order Pendiente: Poner que lea no solo una orden sino TODAS sus ordenes
                    if(stuff) // if exists as an order
                    {
                        sendJSONresponse(res, 200, { order: stuff })
                    }else{
                        stuff = await User.findById(req.params.stuffId) // may a Dealer PENDIENTE: que solo pueda regresar el JSON si son Dealers, el cheff no puede ver otro cheffs
                        if(stuff) /// if exists as a dealer
                        {
                            sendJSONresponse(res, 200, { dealer: stuff })
                        }else{ /// ok it looks that we can find what we want
                            sendJSONresponse(res, 400, { error: 'No se encontro lo que el Cheff pidio' })
                        }
                    }
                }
            }

        }else{ /// if is not a Cheff it must be a dealer, cause Admin has it own routes
            let dealerID = req.user._id
        
            let theOrder = await Order.findOne({'from' : dealerID, '_id': req.params.stuffId }) // the dealer only can get orders
            if(theOrder)
                sendJSONresponse(res, 200, { order: theOrder })
            else
                sendJSONresponse(res, 400, { error: 'Not order for dealer', dealerID: dealerID })
        }

    } catch (error) {
        console.log("Error getting all the drugs::::::::::: \n ",error)  
        return next(error)    // para continuar con todo y error  
    }
}

async function createStuff(req,res,next) { /// lets create something for someone
    try {

        let usuRole = req.user.role  /// first lets try to figure it out who is

        if(usuRole === 'Cheff'){ // if is a Cheff now lets try to find what he wants

            let stuffName = req.params.stuffName // now we know what he wants

            //// PENDIENTE: may check by separate values the items in body
            switch (stuffName) {
                case 'ingredient':
                    {
                        let newIngredient = new Ingredient (req.body);
                        let createdIngredient  = await newIngredient.save();
                        if(createdIngredient)
                            sendJSONresponse(res, 201, { ingredient: createdIngredient })
                        else
                            sendJSONresponse(res, 400, { ingredient: req.body, message: 'bad body' })   
                        break;
                    }
                case 'dealer': //// pendiente: que solo pueda crear dealers, no cheff no
                    {
                        let newDealer = new User (req.body);
                        let createdDealer  = await newDealer.save();
                        if(createdDealer)
                            sendJSONresponse(res, 201, { dealer: createdDealer })
                        else
                            sendJSONresponse(res, 400, { dealer: req.body, message: 'bad body' })  
                        break;
                    }    
                case 'drug':
                    {
                        let newDrug = new Drug (req.body);
                        let createdDrug  = await newDrug.save();
                        if(createdDrug)
                            sendJSONresponse(res, 201, { drug: createdDrug })
                        else
                            sendJSONresponse(res, 400, { drug: req.body, message: 'bad body' })  

                        break;
                    }
                default:
                    break;
            }

        }else{ /// if is not a Cheff it must be a dealer
            
            let newOrder = new Order (req.body); /// Dealers only can create Orders
            let createdOrder  = await newOrder.save();
            if(createdOrder)
                sendJSONresponse(res, 201, { order: createdOrder })
            else
                sendJSONresponse(res, 400, { order: req.body, message: 'bad body' })  

        }

    } catch (error) {
        console.log("Error creating::::::::::: \n ",error)  
        return next(error)    // para continuar con todo y error  
    }
}

async function updateStuff(req,res,next) { /// lets update something for someone
    try {

        let usuRole = req.user.role  /// first lets try to figure it out who is

        if(usuRole === 'Cheff'){ // if is a Cheff now lets try to find what he wants to update

            let stuff = await Drug.findByIdAndUpdate(req.params.stuffId, req.body, {new: true} )// may a drug
            if(stuff) // if exists as a drug
            {
                sendJSONresponse(res, 200, { updatedDrug: stuff })
            }else{
                stuff = await Ingredient.findByIdAndUpdate(req.params.stuffId, req.body, {new: true} ) // may a ingredient
                if(stuff) // if exists as an ingredient
                {
                    sendJSONresponse(res, 200, { updatedIngredient: stuff })
                }else{
                    stuff = await Order.findByIdAndUpdate(req.params.stuffId, req.body, {new: true} ) // may a Order Pendiente: Poner que lea no solo una orden sino TODAS sus ordenes
                    if(stuff) // if exists as an order
                    {
                        sendJSONresponse(res, 200, { updatedOrder: stuff })
                    }else{
                        stuff = await User.findByIdAndUpdate(req.params.stuffId, req.body, {new: true} ) // may a Dealer PENDIENTE: que solo pueda regresar el JSON si son Dealers, el cheff no puede ver otro cheffs
                        if(stuff) /// if exists as a dealer
                        {
                            sendJSONresponse(res, 200, { updatedDealer: stuff })
                        }else{ /// ok it looks that we can find what we want
                            sendJSONresponse(res, 400, { error: 'No se encontro lo que el Cheff pidio para actualizar' })
                        }
                    }
                }
            }

        }else{ /// if is not a Cheff it must be a dealer, cause Admin has it own routes  PENDIENTE: que el dealer pueda hacer update si el from pertenece a su ID
            let dealerID = req.user._id
            
            let updatedOrder = await Order.findByIdAndUpdate(req.params.stuffId, req.body, {new: true} ) // the dealer only can update orders
            if(updatedOrder)
                sendJSONresponse(res, 200, { updatedOrder: updatedOrder })
            else
                sendJSONresponse(res, 400, { error: 'Not order for dealer', dealerID: dealerID })
        }

    } catch (error) {
        console.log("Error updating::::::::::: \n ",error)  
        return next(error)    // para continuar con todo y error  
    }
}


async function deleteStuff(req,res,next) { /// lets delete something for someoneos
    try {

        let usuRole = req.user.role  /// first lets try to figure it out who is

        if(usuRole === 'Cheff'){ // if is a Cheff now lets try to find what he wants to delete

            let stuff = await Drug.findByIdAndRemove(req.params.stuffId)  // may a drug
            if(stuff) // if it delete a drug
            {
                sendJSONresponse(res, 200, { message: "Droga eliminada" })
            }else{
                stuff = await Ingredient.findByIdAndRemove(req.params.stuffId) // may a ingredient
                if(stuff) // if it delete an ingredient
                {
                    sendJSONresponse(res, 200, { message: "Ingrediente eliminado" })
                }else{
                    stuff = await Order.findByIdAndRemove(req.params.stuffId) // may a Order Pendiente: Poner que lea no solo una orden sino TODAS sus ordenes
                    if(stuff) // if it delete an order
                    {
                        sendJSONresponse(res, 200, { message: "Orden eliminada" })
                    }else{
                        stuff = await User.findByIdAndRemove(req.params.stuffId) // may a Dealer PENDIENTE: que solo pueda regresar el JSON si son Dealers, el cheff no puede ver otro cheffs
                        if(stuff) /// if it delete a dealer
                        {
                            sendJSONresponse(res, 200, { message: "Dealer eliminadx" })
                        }else{ /// ok it looks that we can delete what we want
                            sendJSONresponse(res, 400, { error: 'No se encontro lo que el Cheff pidio eliminar' })
                        }
                    }
                }
            }

        }else{ /// if is not a Cheff it must be someone else
                sendJSONresponse(res, 401, { error: 'No deberias estar aqui'})
        }

    } catch (error) {
        console.log("Error deleting::::::::::: \n ",error)  
        return next(error)    // para continuar con todo y error  
    }
}


async function adminGetStuff(req,res,next) { /// lets get something for admin
    try {

            let stuffName = req.params.stuffName // now we know what he wants
            //// PENDIENTE: may check by separate values the items in body
            switch (stuffName) {
                case 'ingredient':
                    {
                        let ingredientList = await Ingredient.find({})
                        sendJSONresponse(res, 200, { ingredients: ingredientList })
                        break;
                    }
                case 'dealer':
                    {
                        let dealerList = await User.find({'role':'Dealer'})
                        sendJSONresponse(res, 200, { dealers: createdDealer })
                        break;
                    }
                case 'Cheff':
                    {
                        let cheffList = await User.find({'role':'Cheff'})
                        sendJSONresponse(res, 200, { cheffs: cheffList })
                        break;
                    }                        
                case 'drug':
                    {
                        let drugsList = await Drug.find({})
                        sendJSONresponse(res, 200, { drugs: drugsList })
                        break;
                    }
                default:
                    break;
            }

       
    } catch (error) {
        console.log("Error getting::::::::::: \n ",error)  
        return next(error)    // para continuar con todo y error  
    }
}

module.exports = {
    readStuff,
    createStuff,
    updateStuff,
    deleteStuff,
    adminGetStuff
}