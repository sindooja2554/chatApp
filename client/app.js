var chatApp = angular.module('chatApp',['ui.router','btford.socket-io']);

chatApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('register',
        {
            url: '/register',
            templateUrl: 'templates/registration.html',
            controller: 'registrationController'
        })

        .state('login',
            {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })


        .state('forgotpassword',
            {
                url: '/forgotpassword',
                templateUrl: 'templates/forgotpassword.html',
                controller: 'forgotpasswordController'
            })

        .state('resetPassword',
            {
                url: '/resetpassword/:token',
                templateUrl: 'templates/resetPassword.html',
                controller: 'resetPasswordController'
            })
        
        .state('dashboard',
            {
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html',
                controller: 'chatController'
            });
     
    $urlRouterProvider.otherwise('/login');
});

chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    console.log(" chat connected");
    return socketFactory({
    ioSocket: io.connect('http://localhost:3000')
    });
}]);