
chatApp.controller('resetPasswordController', function($scope,resetService)
{
    console.log("data in controller--> ", $scope)
    $scope.saveChanges = function()
    {
        var user =
        {
            'password': $scope.password,
        }
        resetService.resetPasswordUser(user,$scope);
    }
});
