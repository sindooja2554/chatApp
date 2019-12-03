chatApp.controller('resetPasswordController', function($stateParams,$scope,resetService)
{
    $scope.passRe = /^[a-zA-Z0-9]+$/;
    console.log("data in controller--> ", $scope)
    $scope.saveChanges = function()
    {
        var user =
        {
            'password': $scope.password,
            'token': $stateParams.token
        }
        console.log(user.token);
        resetService.resetPasswordUser(user,$scope);
    }
});
