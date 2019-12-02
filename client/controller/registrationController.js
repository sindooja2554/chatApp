chatApp.controller("registrationController", function ($scope,serviceRegister) {
    console.log("app",$scope.firstName);
    $scope.register =function()  {
        // console.log("cont")
        var user =
        {
            'firstName': $scope.firstName,
            'lastName': $scope.lastName,
            'email': $scope.email,
            'password': $scope.password
        }
        console.log(user);
        serviceRegister.registerUser(user,$scope);

    }
   
});