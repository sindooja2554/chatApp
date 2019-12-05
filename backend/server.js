var express = require('express');
var cors = require('cors')
const validator = require('express-validator');
const route = require('./routes/routes')
var server = require('http').Server(app);
// var client = require('socket.io')(http);
const io = require('socket.io')(server);
var app = express();
const bodyParser = require('body-parser')
// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

app.use(express.static('../client'));
app.use(bodyParser.json())
app.use(validator());
app.use(cors());
app.use('/', route);

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true                                                  //, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

io.on('connection', function (socket) {
    console.log("socket is connected successfully");
    socket.on('createMessage', function (message) {
        console.log(" listening create message ", message);
        chatcontroller.addMessage(message, (err, data) => {
            console.log('msg from server', message)
            if (err) {
                console.log("Error in message", err);
            }
            else {
                console.log(message, "in server");
                io.emit(message.receiverId, message);// message is going to only reciever not going to self and whole group
            }
        })
        socket.on('disconnect', function () {
            console.log("Socket disconnected");
        });
    });
});

app.listen(3000, function (err) {
    if (err) {
        console.log('Something went wrong');
    }
    else {
        console.log('Server listen on port 3000')

    }
});


