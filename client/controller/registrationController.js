chatApp.controller("registrationController", function ($scope,serviceRegister) {
    console.log("app", $scope.firstName);
    $scope.nameRe = /^[a-zA-Z]+$/;
    $scope.passRe = /^[a-zA-Z0-9]+$/;
    $scope.emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    $scope.register = function () {
        // console.log("cont")
        var user =
        {
            'firstName': $scope.firstName,
            'lastName': $scope.lastName,
            'email': $scope.email,
            'password': $scope.password
        }
        console.log(user);
        serviceRegister.registerUser(user, $scope);
    }
});