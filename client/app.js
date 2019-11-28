var chatApp = angular.module('chatApp',['ui.router']);

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
            });


    $urlRouterProvider.otherwise('/login');
});