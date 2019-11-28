chatApp.controller("loginController", function ($scope,loginService) {

    console.log("data in controller--> ", $scope)
    $scope.login =  () => {
        var userCredentials =
        {
            'email': $scope.email,
            'password': $scope.password
        }
        console.log(userCredentials)
        loginService.loginUser(userCredentials,$scope);
    }
});