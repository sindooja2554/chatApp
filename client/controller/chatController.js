chatApp.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    console.log("snfjsdnfjndjfndsnfjasn")
    $scope.message = '';
    $scope.allUserArr = [];
    
    //assign the data from localstorage
    $scope.currentUserName = localStorage.getItem('name');
    $scope.currentUser = localStorage.getItem('userid');
    $scope.receiverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log("token",token);
    console.log("ab",$scope.currentUserName)
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope, token);
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
