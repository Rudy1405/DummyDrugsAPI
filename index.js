//import { Socket } from 'dgram';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // put de app on any avaliable port in that momento or the 3000
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const logger = require('morgan')
const routes = require("./api/routes/index"); // create routes object that contains all the routes in routes/index.js
var exphbs  = require('express-handlebars'); // html wrapper

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

///sockets

const server = require('http').createServer(app)
const io = require("socket.io")(server)
/// end sockets



mongoose.Promise = global.Promise; // declarando promise
mongoose.connect("mongodb://localhost:27017/dealdrugsapi"); // mongodb conection 

/// handlers de los request

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'))
//app.use('/chat', express.static('./public'))
app.get('/chat', function (req, res) {
    res.render('index');
});
app.get('/chat/chatroom', function (req, res) {
    res.render('chatRoom');
});

routes(app,io); // Cause this obj has nodecode we can use it as the app to register the routes in the server


// put the server running
server.listen(port, () => {
    console.log("We are ready patron, on the port: " + port);
});

