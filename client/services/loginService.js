chatApp.service('loginService', function ($http, $location) {
    this.loginUser = function (data, $scope) {
        console.log("data on service login---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data

        }).then((response) => {
            if(response.data.success==true)
            {
                console.log("login successful");
                console.log(response);
                alert(response.data.message);
                $scope.message = "login successful";
                // $location.path('/dashboard');
            }
            else
            {
                console.log(response);
                alert(response.data.message);
                $scope.message = "login unsuccessful"; 
                $location.path('/login');
            }
        }).catch((response) => {
            console.log("login unsuccessful", response);
            console.log("msg",response.data.message)
            alert(response.data.message);
            $scope.message = response.data.message;
        })
    }
});