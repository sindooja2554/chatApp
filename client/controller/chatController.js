chatApp.controller('chatController', function ($scope, SocketService, $location, chatServices) {
    console.log("snfjsdnfjndjfndsnfjasn")
    $scope.message = "";
    // $scope.getAllMessages='';


    //assign the data from localstorage
    $scope.messageArray = []
    $scope.currentUserName = localStorage.getItem('firstName');
    $scope.currentUserId = localStorage.getItem('_id');
    // $scope.receiverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log("token", token);
    console.log("usrnam", $scope.currentUserName);
    console.log("usrnamID", $scope.currentUserId);

    //getting all users
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope);
    }
    $scope.getAllUsers();

    //Selecting user from the list
    $scope.person = function (receiver) {
        console.log(" reciver^^&&^&&&", receiver._id);
        $scope.messageArray ="";
        $scope.message="";
        localStorage.setItem("receiverfirstName", receiver.firstName);
        localStorage.setItem("receiverId", receiver._id);
        $scope.receiverName = localStorage.getItem("receiverfirstName");
        // $scope.receiver.Id  = localStorage.getItem("receiverId");

        $scope.getReceiverMessages();
    }

    //getting all messages
    $scope.getReceiverMessages = function () {
        var token = localStorage.getItem("token");
        chatServices.getReceiverMessages($scope, token);
    }

    //sending new message
    try {
        $scope.send = function () {
            var senderId = localStorage.getItem('_id');
            var senderName = localStorage.getItem('firstName');
            var receiverId = localStorage.getItem('receiverId');
            var receiverName = localStorage.getItem('receiverfirstName');
            var msg = {
                "senderId": senderId,
                "senderName": senderName,
                "receiverId": receiverId,
                "receiverName": receiverName,
                "message": $scope.message
            };

            console.log("message details------------->", msg);
            // $scope.getAllMessages.push(msg);
            SocketService.emit('createMessage', msg);
            // $scope.getAllMessages.push(msg);
            $scope.messageArray.push(msg)
            $scope.message = "";
        }
    }
    catch (error) {
        console.log('Errors in sending message');
    }

    try {
        var senderId = localStorage.getItem('_id');
        SocketService.on(senderId, (message) => {
            console.log("New Message --->", message);
            if (localStorage.getItem("receiverId") == message.senderId) {
                if ($scope.messageArray === undefined) {
                    $scope.messageArray = message     //assigning message to the variable 
                }
                else {
                    $scope.messageArray.push(message);
                }
            }
        })
    }
    catch (error) {
        console.log("Error");
    }

    try {
        $scope.logout = function () {
            localStorage.clear();
            $location.path('login');

        }
    } catch (error) {
        console.log("Error in logging out");
    }

});
