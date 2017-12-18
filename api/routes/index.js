module.exports = (app, io) => { // declaracion para exportar el modulo
    const express = require('express') /// se necesita express
    const passport = require('passport')
    require('../config/passport')
  //  var io = app.get('socketio');
    const drugs_controller = require('../controllers/drugsController'); // la var necesitara su controlador 
    const authentication_controller = require('../controllers/authentication');
    const chat_controller = require('../controllers/chat')(io); /// not gettin as a funciton

    // Middleware to require login/authentication
    const require_authentication = passport.authenticate('jwt', {
        session: false
    })
  
    const require_login = passport.authenticate('local', {
        session: false
    })

    const api_routes = express.Router() // se crea el modelo router que contiene a todos
    const drug_routes = express.Router() // se crea el modelo router para las rutas de cheff,dealer,admin 
    const auth_routes = express.Router()
    const chat_routes = express.Router()
    ///Routes
    api_routes.use('/drugs', drug_routes) /// se crea la ruta api/drugs
/// DRUGS ROUTES   

    ///admin routes so it can get everything drugs,orders,ingredients,and thei personal
    drug_routes.get('/stuffName',require_authentication,drugs_controller.adminGetStuff)   
    
    // dealer and Cheff Routes
    drug_routes.get('/:stuffId/',require_authentication,drugs_controller.readStuff)
    drug_routes.post('/:stuffName',require_authentication,drugs_controller.createStuff)
    drug_routes.put('/:stuffId',require_authentication,drugs_controller.updateStuff) 
    drug_routes.delete('/:stuffId',require_authentication,drugs_controller.deleteStuff)


//// authentication routes

    api_routes.use('/auth', auth_routes)
    auth_routes.post('/register', authentication_controller.register)
    auth_routes.post('/login', require_login ,authentication_controller.login)

///chat  route
    api_routes.use('/chat', chat_routes)
   // chat_routes.get('/',require_authentication,chat_controller.chat)
   chat_routes.get('/',chat_controller.chat)
  
   app.use ('/api', api_routes)    // Cuando se llega aqui se usa la ruta /API y la funcion apiroutes que es esta
}// end module.exports

