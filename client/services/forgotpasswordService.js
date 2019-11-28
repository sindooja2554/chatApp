angular.module('app', ['ngStorage'])
chatApp.service('forgotService', function ($http, $location) {
    this.forgotPasswordUser = function (data, $scope) {
        console.log("data on service login---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forgetpassword',
            data: data

        }).then((response) => {
            console.log(response.data.data.token);
            $localStorage = response.data.data.token ;
            console.log($localStorage);
            $scope.message = "mail sent successfully";

        }).catch((response) => {
            //console.log("login unsuccessful", response);
            $scope.message = response.data.message;
        })
    }
});