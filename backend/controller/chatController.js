var chatService = require('../services/chatService');

class chatController
{
    sendMessageController(request,response)
    {
        try
        {
            console.log(request.body)
            console.log("in controller")
            let chatDetails = {
                "senderId": request.body.senderId,
                "receiverId": request.body.receiverId,
                "senderName": request.body.senderName,
                "receiverName": request.body.receiverName,
                "message": request.body.message
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

                    return response.status(500).send(res)
                }
                else
                {
                    console.log("data",data)
                    res.message = "msg sent";
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