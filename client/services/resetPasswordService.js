chatApp.service('resetService', function ($http, $location) {
    this.resetPasswordUser = function (data, $scope) {
        console.log("data on service login---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/resetpassword/:id',
            data: data

        }).then((response) => {
            console.log(response);
            $scope.message = "reset password successful";
            $location.path('/login');
        }).catch((response) => {
            console.log("reset password unsuccessful", response);
            $scope.message = response.data.message;
        })
    }
});