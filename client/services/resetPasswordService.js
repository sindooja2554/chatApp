chatApp.service('resetService', function ($http, $location) {
    this.resetPasswordUser = function (data, $scope) {
        console.log("data on service reset---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/reset',
            headers:{
                token:data.token
            },
            data: data
        }).then((response) => {
            console.log("in forntend",response);
            if(response.data.success!==false)
            {
                alert(response.data.data.message);
                $scope.message = "reset password successful";
                $location.path('/login');
            }
            else
            {
                alert(response.data.message);
            }
        }).catch((response) => {
            alert(response.data.message)
            console.log("reset password unsuccessful", response);
            $scope.message = response.data.message;
        })
    }
});