var chatModel = require('../app/model/chat');

class ChatService
{
    sendMessageService(request,callback)
    {
        try
        {
            console.log("inservices")
            chatModel.sendMessage(request, (err , data)=>
            {
                if(err)
                {
                    return callback(err)
                }
                else
                {
                    console.log(data)
                    return callback(null,data)
                }
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }

    receiveMessageService(request,callback)
    {
        try
        {
            chatModel.receiveMessage(request , (error,data)=>
            {
                console.log('inservice')
                if(error)
                {
                    return callback(error)
                }
                else
                {
                    console.log(data)
                    return callback(null,data)
                }
            })
        }
        catch(error)
        {
            console.log(error)
        }
    }

    chatDetailsService(request,callback)
    {
        try
        {
            chatModel.getAllChats(request , (error,data)=>
            {
                console.log('inservice')
                if(error)
                {
                    return callback(error)
                }
                else
                {
                    console.log(data)
                    return callback(null,data)
                }
            })   
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

module.exports=new ChatService();