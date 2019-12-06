chatApp.service('chatServices', function ($http) 
{
    console.log("ser")
    try {
        this.getAllUsers = function ($scope, usertoken) 
        {
            $http({
                method: 'GET',//assigning GET 
                url: 'http://localhost:3000/display',
                // headers: {
                //     'token': usertoken,
                // }
            }).then((response) =>{                          //call back function of http sevice
                    console.log("responsesqdvdhujc7fik18728=>",response.data.data)
                    for(var i=0;i<response.data.data.length;i++)
                    {
                        $scope.allUserArr = response.data.data[i].firstName;
                    }
                    console.log("all elements",$scope.allUserArr);
                    console.log("abc",response.data.data);
                })
                .catch((response) =>
                {
                    console.log("registration Unsuccessful ");
                    console.log(response);
                }
            );
        }
    }
    catch (err) {
        console.log("ERROR: here in getting users")
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
