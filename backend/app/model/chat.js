const mongoose = require('mongoose');
// var user       = require('./user');
const ChatSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    {
        timestamps: true

});

var Chat = mongoose.model('Chat', ChatSchema);

    
class ChatAPI
{
    sendMessage(request, callback) {
        try {
            console.log(request.senderId)
            console.log("in model")
            Chat.findOne({ "senderId": request.senderId }, (error, data) => {
                if (error) {
                    return callback(error)
                }
                else {
                    let chatDetails = new Chat({
                        "senderId": request.senderId,
                        "receiverId": request.receiverId,
                        "senderName": request.senderName,
                        "receiverName": request.receiverName,
                        "message": request.message
                    })
                        console.log(chatDetails);
                    chatDetails.save((error, data) => {
                        if (error) {
                            return callback(error)
                        }
                        else {
                            console.log('Message Sent Successfully', data.senderName);
                            return callback(null, data)
                        }
                    })
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    receiveMessage(request, callback) 
    {
        try {
            console.log("model")
            Chat.find({}, (error, data) => {
                if (error) {
                    return callback(error)
                }
                else {
                    console.log("in model",data)
                    return callback(null, data)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    getAllChats(request, callback)
    {
        try 
        {
            //console.log(req)
            Chat.find({}, (err, data) => {
                if (err) {
                    return callback(err)
                }
                else {
                    console.log(data)
                    return callback(null, data);
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports=new ChatAPI();