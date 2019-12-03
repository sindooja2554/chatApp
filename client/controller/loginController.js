chatApp.controller("loginController", function ($scope,loginService) {
    $scope.passReg = /^[a-zA-Z0-9]+$/;
    $scope.emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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