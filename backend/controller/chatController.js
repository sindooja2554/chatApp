var chatService = require('../services/chatService');

class chatController
{
    sendMessageController(request,callback)
    {
        try
        {
            console.log("request in controller",request)
            console.log("in controller")
            let chatDetails = {
                "senderId": request.senderId,
                "receiverId": request.receiverId,
                "senderName": request.senderName,
                "receiverName": request.receiverName,
                "message": request.message
            }
            console.log(chatDetails)
            chatService.sendMessageService(chatDetails,(error , data)=>
            {
                var res={}
                if(error)
                {
                    res.success = false;
                    res.message = "Error";
                    res.error = error;

                    return callback(error)
                }
                else
                {
                    console.log("data",data)
                    res.message = "msg sent";
                    res.data = data;
                    return callback(null,res)
                }
            })
        }
        catch(error)
        {
            console.log(error)
        }
    }

    receiveMessageController(request,response)
    {
        try
        {
            chatService.receiveMessageService(request,(error,data)=>
            {
                console.log("inctrl")
                var res={};
                if(error)
                {
                    //res.success = false;
                    res.message = "Error";
                    res.error = error;

                    return response.status(500).send(res)
                }
                else
                {
                    console.log(data)
                    res.success = data.success;
                    res.message = data.message;
                    res.data = data;
                    return response.status(200).send(res)
                }
            })
        }
        catch(error)
        {
            console.log(error)
        }
    }

    allChatDetailsController(request,response)
    {  
        //call userServices methods and pass the object
        chatService.chatDetailsService(request, (error, data) => {
            console.log("inctrl")
            var res={};
            if(error)
            {
                res.success = false;
                res.message = "Error";
                res.error = error;
                return response.status(500).send(res)
            }
            else
            {
                console.log("data",data)
                res.success = data.success;
                res.message = data.message;
                res.data = data;
                return response.status(200).send(res)
            }
        })
    }
}

module.exports= new chatController();