angular.module('app', ['ngStorage'])
chatApp.service('forgotService', function ($http, $location) {
    this.forgotPasswordUser = function (data, $scope) {
        console.log("data on service forgot---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forgetpassword',
            data: data
        }).then((response) => {
            console.log("response---",response.data.data.token);
            $scope.message = "mail sent successfully";
            localStorage.setItem("token",response.data.data.token)
        }).catch((response) => {
            if(data.email==undefined)
            {
                alert("Email must be filled");
            }
            else{
                alert("Email is invalid");                
            }
            $scope.message = response.data.message;
        })
    }
});