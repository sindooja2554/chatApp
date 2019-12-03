chatApp.controller("forgotpasswordController", function ($scope,forgotService) {
    $scope.emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    console.log("data in controller--> ", $scope)
    $scope.continue =  () => {
        var user =
        {
            'email': $scope.email
        }
        forgotService.forgotPasswordUser(user,$scope);
    }
});