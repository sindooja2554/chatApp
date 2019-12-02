chatApp.service('serviceRegister',function($http,$location){
    this.registerUser=function(data,$scope){
    console.log("data on service register---",data);
    $http({
    method:'POST',
    url:'http://localhost:3000/registration',
    data:data   
    }).then((response)=>{
    console.log("in frontend-----------",response);
    alert(response.data.message);
    if(response.data.success==true)
    {
        $location.path('/login');
    }
    else
    {
        $location.path('/register');
    }
    }).catch((response)=>{
    console.log("registration unsuccessful",response);
    console.log(response.message,"in service of front end")
    alert(response.data.message);
    $scope.message=response.data.message;
    }
    );
    }
});
    