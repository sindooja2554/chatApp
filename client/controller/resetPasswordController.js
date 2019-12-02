
chatApp.controller('resetPasswordController', function($stateParams,$scope,resetService)
{
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
