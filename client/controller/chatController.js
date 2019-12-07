chatApp.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    console.log("snfjsdnfjndjfndsnfjasn")
    $scope.message = '';
    $scope.getAllMessages = [];
    
    //assign the data from localstorage
    $scope.currentUserName = localStorage.getItem('firstName');
    $scope.currentUserId = localStorage.getItem('_id');
    // $scope.receiverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log("token",token);
    console.log("usrnam",$scope.currentUserName);
    console.log("usrnamID",$scope.currentUserId);

    //getting all users
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope);
    }
    $scope.getAllUsers();

    //Selecting user from the list
    $scope.person = function (receiver){
        console.log(" reciver^^&&^&&&",receiver._id);
        $scope.getAllMessages='';
        localStorage.setItem("receiverfirstName",receiver.firstName);
        localStorage.setItem("receiverId",receiver._id);
        $scope.receiverName = localStorage.getItem("receiverfirstName");
        // $scope.receiver.Id  = localStorage.getItem("receiverId");
       
        $scope.getReceiverMessages();
    }

    //getting all messages
    $scope.getReceiverMessages = function(){
                     var token = localStorage.getItem("token");
        chatServices.getReceiverMessages($scope,token);
    }

    //sending new message
    try{
        $scope.send = function (){
        var senderId     = localStorage.getItem('_id');
        var senderName   = localStorage.getItem('firstName');
        var receiverId   = localStorage.getItem('receiverId');
        var receiverName = localStorage.getItem('receiverfirstName');
        var msg ={
            "senderId"     : senderId,
            "senderName"   : senderName,
            "receiverId"   : receiverId,
            "receiverName" : receiverName,
            "message"      : $scope.message
        };

        console.log("message details------------->",msg);
        SocketService.emit('new message',msg);
        $scope.getAllMessages.push(msg);
        } 
    }
    catch(error)
    {
        console.log('Errors in sending message');
    }
    
    try{
        var senderId = localStorage.getItem('_id');
        SocketService.on(senderId,(message)=>{
            console.log("New Message --->",message);
            if(localStorage.getItem("receiverId") == message.senderId){
                if($scope.getAllMessages === undefined){
                    $scope.getAllMessages = message
                }
                else
                {
                    $scope.getAllMessages.push(message);
                }
            }
        })
    }
    catch(error)
    {
        console.log("Error");
    }

























    
    // if (token === null) {     //if the token is null then redirects to login page
    //     $state.go('login');
    // }
    // try {
    //     SocketService.on('newMessageSingle', (message) => {
    //         if (localStorage.getItem('userid') == message.senderUserId || (localStorage.getItem('userid') == message.receiverUserId && localStorage.getItem('ruserId') == message.senderUserId)) {
    //             if ($scope.allUserArr === undefined) {
    //                 $scope.allUserArr = message;     //assigning message to variable
    //             } else {
    //                 console.log("message",message)
    //                 $scope.allUserArr.push(message);
    //             }
    //         }
    //     })
    // }
    // catch (err) {
    //     console.log("ERROR: in finding the message")
    // }
    // $scope.getAllUsers = function () {
    //     chatServices.getAllUsers($scope, token);
    // }
    // $scope.getAllUsers();
    // $scope.person = function (userData) {          // for selecting a person from list
    //     $scope.allUserArr = '';

    //     localStorage.setItem('rusername', userData.firstname);        //getting the data from localstorage
    //     localStorage.setItem('ruserId', userData._id);
    //     $scope.receiverUserName = localStorage.getItem('rusername');
    //     $scope.getUserMsg();
    // }
    // //get all message
    // $scope.getUserMsg = function () {
    //     chatServices.getUserMsg($scope);
    // }
    // $scope.getUserMsg();
    // try {
    //     console.log("getnuswer")
    //     $scope.sendmessage = function () {   //function to send the message
    //         var msg = {
    //             'senderUserId': localStorage.getItem('userid'),
    //             'senderName': localStorage.getItem('name'),
    //             'receiverUserId': localStorage.getItem('ruserId'),
    //             'receiverName': localStorage.getItem('rusername'),
    //             'message': $scope.message
    //         };
    //         $scope.message = '';
    //         SocketService.emit('createMessage', msg);//to emit the message to the browser
    //     }
    // }
    // catch (err) {
    //     console.log("ERROR: while sending message to the receiver")
    // }

    // try {
    //     $scope.logout = function () {
    //         localStorage.clear();
    //         $state.go('login')//returns back to the login page
    //     }
    // }
    // catch (err) {
    //     console.log("ERROR: while logging out")
    // }
});
