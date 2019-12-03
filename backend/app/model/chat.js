const mongoose = require('mongoose');
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

sendMessage(request,response)
{
    try
    {
        Chat.findOne({ "senderId": request.senderId },(err,data)=>{
            if(err)
            {
                return callback(err)
            }
            else
            {
                let chatDetails = new Chat({
                    "senderId": request.senderId,
                    "receiverId": request.receiverId,
                    "senderName": request.senderName,
                    "receiverName": request.receiverName,
                    "message": request.message
                })

                chatDetails.save((err,data)=>{
                    if(err)
                    {
                        return callback(err)
                    }
                    else
                    {
                        console.log('Message Sent Successfully',data.senderName);
                        return callback(null, data)
                    }
                })
            }
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

receiveMessage(request,response)
{
    try
    {
        Chat.findOne({},(err,data)=>
        {
            if(err)
            {
                return callback(err)
            }
            else
            {
                return callback(null,data)
            }
        })
    }
    catch(err)
    {
        console.log(err)
    }
}