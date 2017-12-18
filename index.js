//import { Socket } from 'dgram';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // put de app on any avaliable port in that momento or the 3000
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const logger = require('morgan')
const http = require('http')
const routes = require("./api/routes/index"); // create routes object that contains all the routes in routes/index.js

///sockets

const server = require('http').createServer(app)
const io = require("socket.io").listen(server)
io.on('connection',(socket)=>{
    console.log('New Conecction, id: ',socket.id)
})
/// end sockets



mongoose.Promise = global.Promise; // declarando promise
mongoose.connect("mongodb://localhost:27017/dealdrugsapi"); // mongodb conection 

/// handlers de los request

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'))
app.use('/', express.static('./api/public'))

routes(app,io); // Cause this obj has nodecode we can use it as the app to register the routes in the server

// put the server running
app.listen(port, () => {
    console.log("We are ready patron, on the port: " + port);
});

