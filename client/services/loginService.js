chatApp.service('loginService', function ($http, $location) {
    this.loginUser = function (data, $scope) {
        console.log("data on service login---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data

        }).then((response) => {
            console.log("login successful");
            console.log(response);
            $scope.message = "login successful";
            //$location.path('/login');
        }).catch((response) => {
            console.log("login unsuccessful", response);
            $scope.message = response.data.message;
        })
    }
});