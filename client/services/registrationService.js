chatApp.service('serviceRegister',function($http,$location){
    this.registerUser=function(data,$scope){
    console.log("data on service register---",data);
    $http({
    method:'POST',
    url:'http://localhost:3000/registration',
    data:data   
    }).then((response)=>{
    console.log("registration successful");
    console.log(response);
    $scope.message="registration successful";
    $location.path('/login');
    }).catch((response)=>{
    console.log("registration unsuccessful",response);
    $scope.message=response.data.message;
    }
    );
    }
});
    