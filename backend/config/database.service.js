/**
 * @description
 * @overview
 * @summary
 * @file
 * 
 * @author
 * 
 * @since
 * @copyright
 * 
 */

/**
 * @const mongoose Mongoose constant having the `mongoose` module
 */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
// Connecting to the database

class Database{

    constructor(credentials){
        this.mongoose = mongoose;
        this.host = credentials.host;
        this.port = credentials.port;
        this.username = credentials.username;
        this.password = credentials.password;
        this.url = credentials.url;
    }

    connect(){
        this.mongoose.connect(this.url, {
            useMongoClient: true,
            connectTimeoutMS: 1000
        });
        this.monitor();
        return this.mongoose;
        // this.mongoose.connect(this.url, {
        //     useNewUrlParser: true ,useUnifiedTopology: true
        // }).then(() => {
        //     return this.mongoose;
        //     console.log("Successfully connected to the database");
        // }).catch(err => {
        //     console.log('Could not connect to the database. Exiting now...', err);
        //     process.exit();
        // });
    }

    monitor(){
        this.mongoose.connection.on('disconnected', function() {
            logger.log('mongo db connection closed');
            process.exit(0);
        });
        
        mongoose.connection.on('connecting', function(){
            logger.info("trying to establish a connection to mongo");
        });
        
        mongoose.connection.on('connected', function() {
            logger.info("connection established successfully");
        });
        
        mongoose.connection.on('error', function(err) {
            logger.error('connection to mongo failed ' + err);
            process.exit(0);
        });
    }
}