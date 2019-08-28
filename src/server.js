const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');


const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

const connectedUsers = {}

io.on('connection', socket => {
    //console.log('nova conexão', socket.id);

    // socket.on('hello', message => {
    //     console.log(message);
    // })

    // setTimeout(() => {
    //     socket.emit('world', {
    //         message: 'vinistrauss'
    //     });
    // }, 5000)

    const {user} = socket.handshake.query;
    //console.log(user, socket.id)
    connectedUsers[user] = socket.id;


});

mongoose.connect('mongodb+srv://vinistrauss:vinicius@cluster0-u0dek.mongodb.net/tindev?retryWrites=true&w=majority', {useNewUrlParser:true});


app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})


app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);
