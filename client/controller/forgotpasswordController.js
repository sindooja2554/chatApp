chatApp.controller("forgotpasswordController", function ($scope,forgotService) {
    console.log("data in controller--> ", $scope)
    $scope.continue =  () => {
        var user =
        {
            'email': $scope.email
        }
        forgotService.forgotPasswordUser(user,$scope);
    }
});