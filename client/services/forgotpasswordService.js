chatApp.service('forgotService', function ($http, $location) {
    this.forgotPasswordUser = function (data, $scope) {
        console.log("data on service forgot---", data);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forgetpassword',
            data: data
        }).then((response) => {
            console.log(response);
            if(response.data.success==false)
            {
                alert(response.data.res.message)
            }
            else
            {
                if(response.data.success!==true)
                {
                    alert(response.data.res.message);
                }
                else
                {
                    console.log("response---",response.data.data.token);
                    $scope.message = "mail sent successfully";
                    // localStorage.setItem("token",response.data.data.token)
                }
            }
        }).catch((response) => {
            console.log(response.data.message)
            alert(response.data.message);
            $scope.message = response.data.message;
        })
    }
});