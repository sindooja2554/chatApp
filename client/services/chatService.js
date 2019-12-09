chatApp.service('chatServices', function ($http,$location) 
{
    this.getAllUsers = function ($scope) 
    {
        $http({
            method: 'GET',                        //assigning GET 
            url: 'http://localhost:3000/display',
        }).then((response) =>                     //call back function of http sevice
        {
            var getUsers = [];
            console.log("responsesqdvdhujc7fik18728=>", response.data.data)
            $scope.getAllUsers = response.data.data;
        }).catch((error) => {
            console.log("Chat Service Error ", error);
        });
    }

    this.getReceiverMessages =function ($scope,token)
    {
        $http({
            method : 'GET',
            url    : 'http://localhost:3000/displaychats',
            headers:{
              token:token
            }
        }).then((response) => 
        {
            var msgArray=[];
            console.log("response------------>",response.data.data);
            for(let i=0;i<response.data.data.length;i++)
            {
                var msgList = response.data.data[i];
                console.log("messages====>",msgList);
                if(((localStorage.getItem('_id') == msgList.senderId)&&(localStorage.getItem('receiverId')===msgList.receiverId))||((localStorage.getItem('_id') === msgList.receiverId)&&(localStorage.getItem('receiverId')===msgList.senderId)))
                { 
                    msgArray.push(msgList);
                    $scope.messageArray = msgArray;
                }
            }
            console.log("Messag--------=>",msgArray);
        }).catch((error) =>
        {
            console.log("Some Error Occurred in getting messages",error);
        })
    }

})
