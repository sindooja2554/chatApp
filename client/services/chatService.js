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
                    $scope.getAllMessages = msgArray
                }
            }
            console.log("Messag--------=>",msgArray);
        }).catch((error) =>
        {
            console.log("Some Error Occurred in getting messages",error);
        })
    }

























//     try {
//         this.getUserMsg = function ($scope) {
//             var arr = [];
//             var usertoken = localStorage.getItem('token');
//             $http({
//                 method: 'GET',//assigning GET 
//                 url: 'http://localhost:3000/displaychats',
//                 headers: {
//                     'token': usertoken,
//                 }
//             }).then(
//                 function successCallback(response) {
//                     console.log("hhheueoehebfwjkbhfjkejkewjk++++++++++++++",response.data.result);

//                     for (let i = 0; i < (response.data.result.length); i++) {
//                         a = response.data.result[i];

//                         if (((localStorage.getItem('userid') == a.senderUserId) && (localStorage.getItem('ruserId') == a.receiverUserId)) || ((localStorage.getItem('userid') == a.receiverUserId && localStorage.getItem('ruserId') == a.senderUserId))) {
//                             console.log("local user is ", localStorage.getItem('userid'), "a user is ", a.senderUserId, " local receiver id is ", localStorage.getItem('ruserId'), "  receiver is ", a.receiverUserId);
//                             arr.push(a);
//                         }

//                     }
//                     $scope.allUserArr = arr;
//                     console.log("User's message was sent successfully ", arr);

//                 },
//                 function errorCallback(response) {
//                     console.log("Unsuccessful ");
//                     console.log(response);

//                 }
//             );
//         }
//     }
//     catch (err) {
//         console.log("ERROR: in getting the message")
//     }

})
