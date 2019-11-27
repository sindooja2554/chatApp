var express = require('express');
const validator = require('express-validator');
const route = require('./routes/routes')
var app = express();
const bodyParser = require('body-parser')
// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

app.use(bodyParser.json())
app.use(validator());

app.use('/', route);

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// app.get('/', function (req, res) {
//     res.send('Hello ');
// });

app.listen(3000, function (err) {
    if (err) {
        console.log('Something went wrong');
    }
    else {
        console.log('Server listen on port 3000')

    }
});
